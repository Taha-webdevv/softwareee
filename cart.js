// Shopping cart functionality

/**
 * Cart item structure:
 * {
 *   id: number,
 *   name: string,
 *   price: number,
 *   image: string,
 *   category: string,
 *   quantity: number
 * }
 */

/**
 * Add item to cart
 * @param {Object} product - Product to add to cart
 * @param {number} quantity - Quantity to add
 */
function addToCart(product, quantity = 1) {
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
      quantity: quantity
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update UI
  updateCartBadge();
  
  // Show notification
  showNotification(`${product.name} added to cart`, 'success');
  
  return cart;
}

/**
 * Remove item from cart
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Find product in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex >= 0) {
    // Remove item from cart
    const removedItem = cart.splice(existingItemIndex, 1)[0];
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartBadge();
    
    // Show notification
    showNotification(`${removedItem.name} removed from cart`, 'info');
  }
  
  return cart;
}

/**
 * Update item quantity in cart
 * @param {number} productId - Product ID to update
 * @param {number} quantity - New quantity
 */
function updateCartItemQuantity(productId, quantity) {
  // Get current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Find product in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is zero or negative
      removeFromCart(productId);
    } else {
      // Update quantity
      cart[existingItemIndex].quantity = quantity;
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update UI
      updateCartBadge();
    }
  }
  
  return cart;
}

/**
 * Get current cart
 * @returns {Array} - Cart items
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

/**
 * Calculate cart subtotal
 * @returns {number} - Cart subtotal
 */
function calculateSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate (default: 0.08 or 8%)
 * @returns {number} - Tax amount
 */
function calculateTax(subtotal, taxRate = 0.08) {
  return subtotal * taxRate;
}

/**
 * Calculate order total
 * @returns {number} - Order total
 */
function calculateTotal() {
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  return subtotal + tax;
}

/**
 * Clear cart
 */
function clearCart() {
  localStorage.setItem('cart', JSON.stringify([]));
  updateCartBadge();
}

/**
 * Save order details to localStorage
 * @param {Object} orderDetails - Order details
 * @returns {string} - Order ID
 */
function saveOrder(orderDetails) {
  // Generate order ID
  const orderId = generateOrderId();
  
  // Add order ID and date
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    ...orderDetails,
    items: getCart(),
    subtotal: calculateSubtotal(),
    tax: calculateTax(calculateSubtotal()),
    total: calculateTotal()
  };
  
  // Get existing orders
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  
  // Add new order
  orders.push(order);
  
  // Save orders
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Clear cart
  clearCart();
  
  return orderId;
}

// Listen for storage events to update cart badge when cart changes in another tab
window.addEventListener('storage', event => {
  if (event.key === 'cart') {
    updateCartBadge();
  }
});