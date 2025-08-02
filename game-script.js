// Game page specific JavaScript functionality
// This file extends the main script.js functionality for individual game pages

// Check if we're on a game page and initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    updateCartDisplay();
    
    // Cart modal events
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    const closeModal = document.querySelector('.close');
    const proceedToWhatsAppBtn = document.getElementById('proceedToWhatsApp');
    
    if (cartIcon) cartIcon.addEventListener('click', openCartModal);
    if (closeModal) closeModal.addEventListener('click', closeCartModal);
    if (proceedToWhatsAppBtn) proceedToWhatsAppBtn.addEventListener('click', proceedToWhatsApp);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Form validation
    const playerIdInput = document.getElementById('playerId');
    if (playerIdInput) {
        playerIdInput.addEventListener('input', function() {
            validatePlayerId(this.value);
        });
    }
});

// Shopping cart functionality (shared with main script)
let cart = JSON.parse(localStorage.getItem('gameShopCart')) || [];

function addToCart(productId, productName, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('gameShopCart', JSON.stringify(cart));
    
    updateCartDisplay();
    showNotification(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('gameShopCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartCountElement) cartCountElement.textContent = cartCount;
    if (cartTotalElement) cartTotalElement.textContent = cartTotal;
    
    // Update cart items in modal
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px;">
                        <div>
                            <h4 style="margin: 0; color: #2c3e50;">${item.name}</h4>
                            <p style="margin: 5px 0; color: #7f8c8d;">Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="cart-item-price">${item.price * item.quantity} coins</div>
                        <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 5px; transition: all 0.3s ease;">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function proceedToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! Please add some items first.', 'error');
        return;
    }
    
    // Get player info from form
    const playerIdInput = document.getElementById('playerId');
    const playerNameInput = document.getElementById('playerName');
    const notesInput = document.getElementById('additionalNotes');
    
    // Validate required fields
    if (playerIdInput && !playerIdInput.value.trim()) {
        showNotification('Please enter your Player ID/UID!', 'error');
        playerIdInput.focus();
        return;
    }
    
    // Generate order message
    let orderDetails = "🎮 *GAMING ORDER DETAILS*\n";
    orderDetails += "═══════════════════════\n\n";
    
    // Add player info
    if (playerIdInput && playerIdInput.value.trim()) {
        orderDetails += `👤 *Player ID/UID:* ${playerIdInput.value.trim()}\n`;
    }
    if (playerNameInput && playerNameInput.value.trim()) {
        orderDetails += `🎯 *Player Name:* ${playerNameInput.value.trim()}\n`;
    }
    
    orderDetails += "\n📦 *ORDERED ITEMS:*\n";
    orderDetails += "─────────────────────\n";
    
    let totalAmount = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        orderDetails += `${index + 1}. **${item.name}**\n`;
        orderDetails += `   💰 ${item.price} coins × ${item.quantity} = *${itemTotal} coins*\n\n`;
    });
    
    orderDetails += "═══════════════════════\n";
    orderDetails += `💳 **TOTAL AMOUNT: ${totalAmount} coins**\n`;
    orderDetails += "═══════════════════════\n\n";
    
    // Add additional notes
    if (notesInput && notesInput.value.trim()) {
        orderDetails += `📝 *Additional Notes:*\n${notesInput.value.trim()}\n\n`;
    }
    
    // Add delivery info
    orderDetails += "⏰ *Delivery Time:* 5-15 minutes\n";
    orderDetails += "✅ *Service:* Digital Gaming Top-up\n";
    orderDetails += "🔒 *Security:* 100% Safe & Secure\n\n";
    orderDetails += "💬 *Please confirm this order and we'll process it immediately!*\n";
    orderDetails += "📞 *For any questions, just reply to this message.*";
    
    // WhatsApp phone number
    const phoneNumber = "8801757418752";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderDetails)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Clear cart after successful redirect
    cart = [];
    localStorage.removeItem('gameShopCart');
    updateCartDisplay();
    closeCartModal();
    
    // Show success message
    showNotification('✅ Redirecting to WhatsApp... Your order has been prepared!', 'success');
    
    // Clear form
    if (playerIdInput) playerIdInput.value = '';
    if (playerNameInput) playerNameInput.value = '';
    if (notesInput) notesInput.value = '';
}

function validatePlayerId(playerId) {
    const playerIdInput = document.getElementById('playerId');
    if (!playerIdInput) return;
    
    // Remove any invalid characters (basic validation)
    const cleanId = playerId.replace(/[^a-zA-Z0-9]/g, '');
    
    if (cleanId !== playerId) {
        playerIdInput.value = cleanId;
        showNotification('Only letters and numbers are allowed in Player ID', 'info');
    }
    
    // Basic length validation
    if (cleanId.length > 0 && cleanId.length < 6) {
        playerIdInput.style.borderColor = '#f39c12';
    } else if (cleanId.length >= 6) {
        playerIdInput.style.borderColor = '#27ae60';
    } else {
        playerIdInput.style.borderColor = '#e0e0e0';
    }
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Different colors for different types
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#25d366';
            break;
        case 'error':
            backgroundColor = '#e74c3c';
            break;
        case 'info':
            backgroundColor = '#3498db';
            break;
        default:
            backgroundColor = '#25d366';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        font-weight: bold;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Buy Now function for direct WhatsApp purchase
function buyNowWhatsApp() {
    // Get player info from form
    const playerIdInput = document.getElementById('playerId');
    const playerNameInput = document.getElementById('playerName');
    const notesInput = document.getElementById('additionalNotes');
    
    // Validate required fields
    if (!playerIdInput || !playerIdInput.value.trim()) {
        showNotification('Please enter your Player ID/UID first!', 'error');
        if (playerIdInput) playerIdInput.focus();
        return;
    }
    
    // Get current game type from URL or page title
    const gameTitle = document.querySelector('.game-info h1')?.textContent || 'Gaming Service';
    
    // Generate quick order message
    let orderDetails = "🎮 *QUICK BUY REQUEST*\n";
    orderDetails += "═══════════════════════\n\n";
    
    orderDetails += `🎯 *Service:* ${gameTitle}\n`;
    orderDetails += `👤 *Player ID/UID:* ${playerIdInput.value.trim()}\n`;
    
    if (playerNameInput && playerNameInput.value.trim()) {
        orderDetails += `🏷️ *Player Name:* ${playerNameInput.value.trim()}\n`;
    }
    
    if (notesInput && notesInput.value.trim()) {
        orderDetails += `📝 *Notes:* ${notesInput.value.trim()}\n`;
    }
    
    orderDetails += "\n💬 *Message:*\n";
    orderDetails += "Hi! I'm interested in purchasing gaming services. Please show me available packages and prices for the above service.\n\n";
    
    orderDetails += "⏰ *Preferred Delivery:* ASAP\n";
    orderDetails += "💳 *Payment Method:* Will discuss\n\n";
    
    orderDetails += "📞 *Please reply with available packages and pricing!*";
    
    // WhatsApp phone number
    const phoneNumber = "8801757418752";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderDetails)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showNotification('✅ Redirecting to WhatsApp for quick purchase!', 'success');
    
    // Clear form after successful redirect
    if (playerIdInput) playerIdInput.value = '';
    if (playerNameInput) playerNameInput.value = '';
    if (notesInput) notesInput.value = '';
}

// Enhanced product card interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'C' to open cart
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            openCartModal();
        }
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        closeCartModal();
    }
});

// Add CSS animations if not already present
if (!document.querySelector('#gamePageStyles')) {
    const style = document.createElement('style');
    style.id = 'gamePageStyles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .notification {
            animation: slideInRight 0.3s ease !important;
        }
        .btn-add-to-cart:active {
            animation: pulse 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
