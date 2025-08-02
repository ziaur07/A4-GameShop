// Game data and products
const gameData = {
    pubg: {
        name: "PUBG MOBILE",
        subtitle: "Player ID Topup",
        deliveryTime: "5-10min",
        logo: "images/pubg.jpg",
        products: [
            { id: 1, name: "Prime Plus (1 Month)", price: 1150, image: "images/pubg.jpg" },
            { id: 2, name: "Prime Plus (3 Months)", price: 3400, image: "images/pubg.jpg" },
            { id: 3, name: "Prime Plus (6 Months)", price: 6800, image: "images/pubg.jpg" },
            { id: 4, name: "Prime Plus (12 Months)", price: 13500, image: "images/pubg.jpg" },
            { id: 5, name: "Upgradable Firearm Materials Pack", price: 420, image: "images/pubg.jpg" },
            { id: 6, name: "Mythic Emblem Pack", price: 620, image: "images/pubg.jpg" }
        ]
    },
    freefire: {
        name: "Free Fire",
        subtitle: "Player ID Topup",
        deliveryTime: "5-10min",
        logo: "images/ff.png",
        products: [
            { id: 7, name: "100 Diamonds", price: 120, image: "images/ff.png" },
            { id: 8, name: "310 Diamonds", price: 360, image: "images/ff.png" },
            { id: 9, name: "520 Diamonds", price: 600, image: "images/ff.png" },
            { id: 10, name: "1080 Diamonds", price: 1200, image: "images/ff.png" },
            { id: 11, name: "Monthly Pass", price: 450, image: "images/ff.png" },
            { id: 12, name: "Elite Pass", price: 800, image: "images/ff.png" }
        ]
    },
    supercell: {
        name: "Supercell Games",
        subtitle: "Player ID Topup",
        deliveryTime: "5-15min",
        logo: "images/SC.png",
        products: [
            { id: 13, name: "Clash of Clans - 500 Gems", price: 350, image: "images/SC.png" },
            { id: 14, name: "Clash Royale - 500 Gems", price: 350, image: "images/SC.png" },
            { id: 15, name: "Brawl Stars - 170 Gems", price: 300, image: "images/SC.png" },
            { id: 16, name: "Boom Beach - 500 Diamonds", price: 400, image: "images/SC.png" }
        ]
    },
    netflix: {
        name: "Netflix",
        subtitle: "Account Subscription",
        deliveryTime: "Instant",
        logo: "images/netflix.jpg",
        products: [
            { id: 17, name: "Netflix 1 Month", price: 1200, image: "images/netflix.jpg" },
            { id: 18, name: "Netflix 3 Months", price: 3400, image: "images/netflix.jpg" },
            { id: 19, name: "Netflix 6 Months", price: 6500, image: "images/netflix.jpg" },
            { id: 20, name: "Netflix 12 Months", price: 12000, image: "images/netflix.jpg" }
        ]
    },
    unipin: {
        name: "UniPin Voucher",
        subtitle: "Gaming Credits",
        deliveryTime: "Instant",
        logo: "images/UP.jpg",
        products: [
            { id: 21, name: "UniPin 50,000 Credits", price: 500, image: "images/UP.jpg" },
            { id: 22, name: "UniPin 100,000 Credits", price: 1000, image: "images/UP.jpg" },
            { id: 23, name: "UniPin 200,000 Credits", price: 2000, image: "images/UP.jpg" },
            { id: 24, name: "UniPin 500,000 Credits", price: 5000, image: "images/UP.jpg" }
        ]
    },
    deltaforce: {
        name: "Delta Force",
        subtitle: "Items & Currency",
        deliveryTime: "5-10min",
        logo: "images/DF.png",
        products: [
            { id: 25, name: "Battle Pass", price: 800, image: "images/DF.png" },
            { id: 26, name: "Weapon Skin Pack", price: 600, image: "images/DF.png" },
            { id: 27, name: "Character Bundle", price: 1200, image: "images/DF.png" },
            { id: 28, name: "Premium Currency 1000", price: 1000, image: "images/DF.png" }
        ]
    },
    bloodstrike: {
        name: "Blood Strike",
        subtitle: "Items & Currency",
        deliveryTime: "5-10min",
        logo: "images/BS.jpg",
        products: [
            { id: 29, name: "Gold Pass", price: 750, image: "images/BS.jpg" },
            { id: 30, name: "Weapon Crate", price: 400, image: "images/BS.jpg" },
            { id: 31, name: "Character Skin", price: 600, image: "images/BS.jpg" },
            { id: 32, name: "Premium Coins 500", price: 500, image: "images/BS.jpg" }
        ]
    },
    pubgvoucher: {
        name: "PUBG Voucher",
        subtitle: "UC Vouchers",
        deliveryTime: "Instant",
        logo: "images/pubg voucher.png",
        products: [
            { id: 33, name: "PUBG UC 300 Voucher", price: 300, image: "images/pubg voucher.png" },
            { id: 34, name: "PUBG UC 600 Voucher", price: 600, image: "images/pubg voucher.png" },
            { id: 35, name: "PUBG UC 1500 Voucher", price: 1500, image: "images/pubg voucher.png" },
            { id: 36, name: "PUBG UC 3000 Voucher", price: 3000, image: "images/pubg voucher.png" }
        ]
    }
};

// Shopping cart with localStorage persistence
let cart = JSON.parse(localStorage.getItem('gameShopCart')) || [];
let coinBalance = 0;

// DOM elements
const cartModal = document.getElementById('cartModal');
const cartIcon = document.querySelector('.cart-icon');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');
const coinBalanceElement = document.getElementById('coinBalance');
const proceedToWhatsAppBtn = document.getElementById('proceedToWhatsApp');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCoinBalance();
    initializeModernCarousel();
    
    // Add click listeners to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameType = this.dataset.game;
            if (gameData[gameType]) {
                openGamePage(gameType);
            }
        });
    });
    
    // Cart modal events
    cartIcon.addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    proceedToWhatsAppBtn.addEventListener('click', proceedToWhatsApp);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
});

// Modern Carousel functionality
let currentService = 'pubg';
let carouselInterval;

const serviceData = {
    pubg: {
        title: 'PUBG Mobile',
        desc: 'UC & Prime Plus Available',
        badge: '⚡ Instant Delivery'
    },
    freefire: {
        title: 'Free Fire',
        desc: 'Diamonds & Elite Pass',
        badge: '🔥 Hot Deals'
    },
    supercell: {
        title: 'Supercell Games',
        desc: 'Gems & Coins for All Games',
        badge: '💎 Best Value'
    },
    netflix: {
        title: 'Netflix',
        desc: 'Premium Subscriptions',
        badge: '📺 HD Streaming'
    },
    unipin: {
        title: 'UniPin Voucher',
        desc: 'Gaming Credits & Vouchers',
        badge: '🎫 All Platforms'
    },
    deltaforce: {
        title: 'Delta Force',
        desc: 'Items & Currency',
        badge: '⚔️ Combat Ready'
    },
    bloodstrike: {
        title: 'Blood Strike',
        desc: 'Gold Pass & Weapons',
        badge: '🩸 Action Packed'
    },
    pubgvoucher: {
        title: 'PUBG Voucher',
        desc: 'UC Vouchers Available',
        badge: '🎟️ Instant Code'
    }
};

function initializeModernCarousel() {
    const gameIcons = document.querySelectorAll('.game-icon');
    const dots = document.querySelectorAll('.modern-dot');
    
    if (gameIcons.length === 0) return;
    
    // Add click listeners to game icons
    gameIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const service = icon.dataset.service;
            switchToService(service);
        });
    });
    
    // Add click listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const service = dot.dataset.service;
            switchToService(service);
        });
    });
    
    // Start auto-rotation
    startCarouselAutoplay();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.hero-carousel-modern');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoplay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoplay);
    }
    
    // Add arrow navigation
    const prevArrow = document.querySelector('.carousel-arrow-prev');
    const nextArrow = document.querySelector('.carousel-arrow-next');
    const services = Object.keys(serviceData);
    
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            const currentIndex = services.indexOf(currentService);
            const prevIndex = currentIndex === 0 ? services.length - 1 : currentIndex - 1;
            switchToService(services[prevIndex]);
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            const currentIndex = services.indexOf(currentService);
            const nextIndex = (currentIndex + 1) % services.length;
            switchToService(services[nextIndex]);
        });
    }
}

function switchToService(service) {
    if (!serviceData[service]) return;
    
    // Update active states
    document.querySelectorAll('.game-icon').forEach(icon => {
        icon.classList.toggle('active', icon.dataset.service === service);
    });
    
    document.querySelectorAll('.modern-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.service === service);
    });
    
    // Update phone content with animation
    const serviceTitle = document.getElementById('activeServiceTitle');
    const serviceDesc = document.getElementById('activeServiceDesc');
    const serviceBadge = document.querySelector('.service-badge span');
    
    if (serviceTitle && serviceDesc && serviceBadge) {
        // Fade out
        serviceTitle.style.opacity = '0';
        serviceDesc.style.opacity = '0';
        serviceBadge.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            serviceTitle.textContent = serviceData[service].title;
            serviceDesc.textContent = serviceData[service].desc;
            serviceBadge.textContent = serviceData[service].badge;
            
            // Fade in
            serviceTitle.style.opacity = '1';
            serviceDesc.style.opacity = '1';
            serviceBadge.style.opacity = '1';
        }, 200);
    }
    
    currentService = service;
}

function startCarouselAutoplay() {
    stopCarouselAutoplay();
    const services = Object.keys(serviceData);
    let currentIndex = services.indexOf(currentService);
    
    carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % services.length;
        switchToService(services[currentIndex]);
    }, 3000);
}

function stopCarouselAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function openGamePage(gameType) {
    // Simple redirect to actual HTML files - works perfectly on mobile
    const gamePageMap = {
        'pubg': 'pubg.html',
        'freefire': 'freefire.html',
        'supercell': 'supercell.html',
        'netflix': 'netflix.html',
        'unipin': 'unipin.html',
        'deltaforce': 'deltaforce.html',
        'bloodstrike': 'bloodstrike.html',
        'pubgvoucher': 'pubgvoucher.html'
    };
    
    const targetPage = gamePageMap[gameType];
    if (targetPage) {
        // Use window.location.href for better mobile compatibility
        window.location.href = targetPage;
    } else {
        // Fallback - show alert for missing pages
        alert(`${gameType} page is coming soon! Contact us via WhatsApp for now.`);
        window.open('https://wa.me/8801757418752', '_blank');
    }
}

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
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal;
    
    // Update cart items in modal
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px;">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div class="cart-item-price">${item.price * item.quantity} coins</div>
                    <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-top: 5px;">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
}

function updateCoinBalance() {
    // This would typically fetch from a server
    coinBalance = 0; // Default balance
    coinBalanceElement.textContent = coinBalance;
}

function openCartModal() {
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function proceedToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Get player ID from form if on game page
    const playerIdInput = document.getElementById('playerId');
    const playerNameInput = document.getElementById('playerName');
    const notesInput = document.getElementById('additionalNotes');
    
    let orderDetails = "🎮 *GAMING ORDER DETAILS*\n\n";
    
    // Add player info if available
    if (playerIdInput && playerIdInput.value) {
        orderDetails += `👤 *Player ID:* ${playerIdInput.value}\n`;
    }
    if (playerNameInput && playerNameInput.value) {
        orderDetails += `🏷️ *Player Name:* ${playerNameInput.value}\n`;
    }
    
    orderDetails += "\n📦 *ORDERED ITEMS:*\n";
    
    let totalAmount = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        orderDetails += `${index + 1}. ${item.name}\n   💰 ${item.price} coins x ${item.quantity} = ${itemTotal} coins\n\n`;
    });
    
    orderDetails += `💳 *TOTAL AMOUNT:* ${totalAmount} coins\n`;
    
    if (notesInput && notesInput.value) {
        orderDetails += `\n📝 *Additional Notes:*\n${notesInput.value}\n`;
    }
    
    orderDetails += "\n⏰ *Delivery Time:* 5-15 minutes\n";
    orderDetails += "✅ *Payment:* Please confirm this order and we'll process it immediately!";
    
    // WhatsApp phone number (replace with actual number)
    const phoneNumber = "8801757418752";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderDetails)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Clear cart after successful redirect
    cart = [];
    localStorage.removeItem('gameShopCart');
    updateCartDisplay();
    closeCartModal();
    
    showNotification('Redirecting to WhatsApp...', 'success');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
