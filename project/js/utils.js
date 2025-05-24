// Utility functions for general use throughout the application

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Format a date to a readable string
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Generate a random ID for orders
 * @returns {string} - Random order ID
 */
function generateOrderId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/**
 * Truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Create star rating HTML
 * @param {number} rating - Rating value (0-5)
 * @returns {string} - HTML for star rating
 */
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let html = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fas fa-star"></i>';
  }
  
  // Half star
  if (hasHalfStar) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="far fa-star"></i>';
  }
  
  return html;
}

/**
 * Get URL parameters as an object
 * @returns {Object} - URL parameters
 */
function getUrlParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  
  return params;
}

/**
 * Display a notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, warning, info)
 * @param {number} duration - Duration in ms
 */
function showNotification(message, type = 'info', duration = 3000) {
  // Check if notification container exists, create if not
  let container = document.querySelector('.notification-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    
    // Add style for the container if not already in CSS
    const style = document.createElement('style');
    style.textContent = `
      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
      .notification {
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      }
      .notification.show {
        opacity: 1;
        transform: translateX(0);
      }
      .notification.success { background-color: var(--color-success); }
      .notification.error { background-color: var(--color-error); }
      .notification.warning { background-color: var(--color-warning); }
      .notification.info { background-color: var(--color-primary); }
    `;
    document.head.appendChild(style);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to container
  container.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add animation class and remove after animation completes
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS class for animation
 */
function animateElement(element, animationClass) {
  element.classList.add(animationClass);
  element.addEventListener('animationend', () => {
    element.classList.remove(animationClass);
  }, { once: true });
}

/**
 * Set page title
 * @param {string} title - Page title
 */
function setPageTitle(title) {
  document.title = `${title} | ByteMarket`;
}

/**
 * Update cart count badge
 */
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = document.querySelectorAll('.cart-count');
  
  let totalItems = 0;
  cart.forEach(item => {
    totalItems += item.quantity;
  });
  
  cartCount.forEach(badge => {
    badge.textContent = totalItems;
    
    // Add animation if count increased
    if (totalItems > 0) {
      animateElement(badge, 'pulse');
    }
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
  }
}

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setupMobileMenu();
});