// Product Listing Page JavaScript

// DOM Elements
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const actionBtns = document.querySelectorAll('.action-btn');
const filterSelects = document.querySelectorAll('.filter-select');
const ctaBtn = document.querySelector('.cta-btn');
const newsletterForm = document.querySelector('.newsletter-form');

// Cart functionality
let cartItems = 0;
let wishlistItems = [];

// Initialize cart count from localStorage
if (localStorage.getItem('cartItems')) {
    cartItems = parseInt(localStorage.getItem('cartItems'));
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    cartCount.textContent = cartItems;
    localStorage.setItem('cartItems', cartItems.toString());
}

// Add to cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        // Add to cart
        cartItems++;
        updateCartCount();
        
        // Show success message
        showNotification(`${productTitle} added to cart!`, 'success');
        
        // Add animation to cart button
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    });
});

// Wishlist functionality
actionBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const icon = this.querySelector('i');
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        if (icon.classList.contains('fa-heart')) {
            // Toggle wishlist
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                wishlistItems = wishlistItems.filter(item => item !== productTitle);
                showNotification(`${productTitle} removed from wishlist`, 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff4757';
                wishlistItems.push(productTitle);
                showNotification(`${productTitle} added to wishlist!`, 'success');
            }
        } else if (icon.classList.contains('fa-shopping-cart')) {
            // Quick add to cart
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            cartItems++;
            updateCartCount();
            showNotification(`${productTitle} added to cart!`, 'success');
        }
    });
});

// Filter functionality
filterSelects.forEach(select => {
    select.addEventListener('change', function() {
        const filterType = this.previousElementSibling.textContent.replace(':', '');
        const selectedValue = this.value;
        
        // Simulate filtering (in a real app, this would filter the actual products)
        showNotification(`Filtered by ${filterType}: ${selectedValue}`, 'info');
        
        // Add loading animation to products grid
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            productsGrid.style.opacity = '1';
        }, 500);
    });
});

// CTA button functionality
ctaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Smooth scroll to products section
    const productsSection = document.querySelector('.products');
    productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    showNotification('Scroll to products section', 'info');
});

// Newsletter subscription
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Search functionality (placeholder)
document.querySelector('.search-btn').addEventListener('click', function() {
    showNotification('Search functionality coming soon!', 'info');
});

// Cart button click
cartBtn.addEventListener('click', function() {
    if (cartItems > 0) {
        showNotification(`You have ${cartItems} item(s) in your cart`, 'info');
    } else {
        showNotification('Your cart is empty', 'info');
    }
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    console.log('Product listing page loaded successfully!');
}); 