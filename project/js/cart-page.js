// Cart page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Shopping Cart');
  
  // Load cart items
  loadCartItems();
  
  // Add event listener for checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }
  
  // Add event listener for continue shopping button
  const continueShoppingBtn = document.getElementById('continue-shopping');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      window.location.href = 'products.html';
    });
  }
});

/**
 * Load cart items into the cart page
 */
function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const emptyCart = document.getElementById('empty-cart');
  const subtotalElement = document.getElementById('cart-subtotal');
  const taxElement = document.getElementById('cart-tax');
  const totalElement = document.getElementById('cart-total');
  
  if (!cartItemsContainer) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    // Cart is empty
    cartItemsContainer.innerHTML = '';
    
    if (cartSummary) {
      cartSummary.classList.add('hidden');
    }
    
    if (emptyCart) {
      emptyCart.classList.remove('hidden');
    }
    
    return;
  }
  
  // Cart has items
  if (cartSummary) {
    cartSummary.classList.remove('hidden');
  }
  
  if (emptyCart) {
    emptyCart.classList.add('hidden');
  }
  
  // Build cart items HTML
  let html = '';
  
  cart.forEach(item => {
    html += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <div class="cart-item-category">${item.category === 'software' ? 'Software' : 'E-Book'}</div>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="cart-item-quantity">
            <button type="button" class="decrease-quantity"><i class="fas fa-minus"></i></button>
            <input type="number" class="item-quantity" value="${item.quantity}" min="1" max="10" data-id="${item.id}">
            <button type="button" class="increase-quantity"><i class="fas fa-plus"></i></button>
          </div>
          <button type="button" class="remove-item" data-id="${item.id}">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = html;
  
  // Update summary
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();
  
  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(subtotal);
  }
  
  if (taxElement) {
    taxElement.textContent = formatCurrency(tax);
  }
  
  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }
  
  // Add event listeners for quantity controls
  setupCartQuantityControls();
  
  // Add event listeners for remove buttons
  setupRemoveItemButtons();
}

/**
 * Setup quantity control buttons in cart
 */
function setupCartQuantityControls() {
  const decreaseButtons = document.querySelectorAll('.decrease-quantity');
  const increaseButtons = document.querySelectorAll('.increase-quantity');
  const quantityInputs = document.querySelectorAll('.item-quantity');
  
  // Decrease quantity
  decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('.item-quantity');
      const id = parseInt(input.dataset.id);
      let quantity = parseInt(input.value);
      
      if (quantity > 1) {
        quantity--;
        input.value = quantity;
        updateCartItemQuantity(id, quantity);
        updateCartSummary();
      }
    });
  });
  
  // Increase quantity
  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentElement.querySelector('.item-quantity');
      const id = parseInt(input.dataset.id);
      let quantity = parseInt(input.value);
      
      if (quantity < 10) {
        quantity++;
        input.value = quantity;
        updateCartItemQuantity(id, quantity);
        updateCartSummary();
      }
    });
  });
  
  // Input change
  quantityInputs.forEach(input => {
    input.addEventListener('change', () => {
      const id = parseInt(input.dataset.id);
      let quantity = parseInt(input.value);
      
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        input.value = quantity;
      } else if (quantity > 10) {
        quantity = 10;
        input.value = quantity;
      }
      
      updateCartItemQuantity(id, quantity);
      updateCartSummary();
    });
  });
}

/**
 * Setup remove item buttons
 */
function setupRemoveItemButtons() {
  const removeButtons = document.querySelectorAll('.remove-item');
  
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      const cartItem = button.closest('.cart-item');
      
      // Add removing animation
      cartItem.classList.add('removing');
      
      // Wait for animation to complete
      setTimeout(() => {
        // Remove from cart
        removeFromCart(id);
        
        // Update UI
        loadCartItems();
      }, 300);
    });
  });
}

/**
 * Update cart summary (subtotal, tax, total)
 */
function updateCartSummary() {
  const subtotalElement = document.getElementById('cart-subtotal');
  const taxElement = document.getElementById('cart-tax');
  const totalElement = document.getElementById('cart-total');
  
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();
  
  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(subtotal);
  }
  
  if (taxElement) {
    taxElement.textContent = formatCurrency(tax);
  }
  
  if (totalElement) {
    totalElement.textContent = formatCurrency(total);
  }
}