// Checkout page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Checkout');
  
  // Setup checkout form steps
  setupCheckoutSteps();
  
  // Setup input formatting
  setupInputFormatting(document.querySelector('.checkout-form-container'));
  
  // Load cart items in order summary
  loadCheckoutItems();
  
  // Validate order before submission
  setupFormValidation();
});

/**
 * Setup checkout form steps
 */
function setupCheckoutSteps() {
  const customerInfoStep = document.getElementById('customer-info');
  const paymentInfoStep = document.getElementById('payment-info');
  const toPaymentBtn = document.getElementById('to-payment-btn');
  const backToCustomerBtn = document.getElementById('back-to-customer-btn');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const steps = document.querySelectorAll('.checkout-steps .step');
  
  if (!customerInfoStep || !paymentInfoStep || !toPaymentBtn || !backToCustomerBtn || !placeOrderBtn) return;
  
  // Go to payment step
  toPaymentBtn.addEventListener('click', () => {
    // Validate customer info form
    const customerInfoValid = validateForm(document.getElementById('checkout-form'), {
      'name': { type: 'name', message: 'Please enter your full name' },
      'email': { type: 'email' },
      'country': { type: 'select', message: 'Please select your country' },
      'zip': { type: 'zip' }
    });
    
    if (customerInfoValid) {
      customerInfoStep.classList.remove('active');
      paymentInfoStep.classList.add('active');
      
      // Update steps UI
      steps[0].classList.add('completed');
      steps[1].classList.add('active');
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  
  // Go back to customer info step
  backToCustomerBtn.addEventListener('click', () => {
    paymentInfoStep.classList.remove('active');
    customerInfoStep.classList.add('active');
    
    // Update steps UI
    steps[1].classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Place order button
  placeOrderBtn.addEventListener('click', () => {
    // Validate payment info form
    const paymentInfoValid = validateForm(document.getElementById('checkout-form'), {
      'card-number': { type: 'creditCard' },
      'expiry': { type: 'expiry' },
      'cvv': { type: 'cvv' },
      'name-on-card': { type: 'name', message: 'Please enter the name as it appears on your card' }
    });
    
    if (paymentInfoValid) {
      // Show processing overlay
      const processingOverlay = document.getElementById('processing-overlay');
      if (processingOverlay) {
        processingOverlay.classList.remove('hidden');
      }
      
      // Simulate payment processing
      setTimeout(() => {
        // Get form data
        const form = document.getElementById('checkout-form');
        const customerData = {
          name: form.elements['name'].value,
          email: form.elements['email'].value,
          country: form.elements['country'].value,
          zip: form.elements['zip'].value,
          payment: {
            cardNumber: form.elements['card-number'].value.slice(-4), // Only store last 4 digits
            nameOnCard: form.elements['name-on-card'].value
          }
        };
        
        // Save order to localStorage
        const orderId = saveOrder(customerData);
        
        // Redirect to confirmation page
        window.location.href = `confirmation.html?order=${orderId}`;
      }, 2000);
    }
  });
}

/**
 * Load cart items in checkout order summary
 */
function loadCheckoutItems() {
  const checkoutItemsContainer = document.getElementById('checkout-items');
  const subtotalElement = document.getElementById('checkout-subtotal');
  const taxElement = document.getElementById('checkout-tax');
  const totalElement = document.getElementById('checkout-total');
  
  if (!checkoutItemsContainer) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    // No items in cart, redirect to cart page
    window.location.href = 'cart.html';
    return;
  }
  
  // Build checkout items HTML
  let html = '';
  
  cart.forEach(item => {
    html += `
      <div class="checkout-item">
        <div class="checkout-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="checkout-item-details">
          <div class="checkout-item-title">${item.name}</div>
          <div class="checkout-item-price">
            <span>${formatCurrency(item.price)} × ${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  checkoutItemsContainer.innerHTML = html;
  
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
}

/**
 * Setup form validation
 */
function setupFormValidation() {
  // Add real-time validation to email field
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.value.trim() !== '') {
        const errorElement = emailInput.nextElementSibling;
        if (!isValidEmail(emailInput.value)) {
          emailInput.classList.add('error');
          if (errorElement) {
            errorElement.textContent = 'Please enter a valid email address';
          }
        } else {
          emailInput.classList.remove('error');
          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      }
    });
  }
  
  // Add real-time validation to card number field
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('blur', () => {
      if (cardNumberInput.value.trim() !== '') {
        const errorElement = cardNumberInput.parentElement.nextElementSibling;
        if (!isValidCreditCard(cardNumberInput.value)) {
          cardNumberInput.classList.add('error');
          if (errorElement) {
            errorElement.textContent = 'Please enter a valid credit card number';
          }
        } else {
          cardNumberInput.classList.remove('error');
          if (errorElement) {
            errorElement.textContent = '';
          }
          
          // Update card type icons
          updateCardTypeIcons(cardNumberInput.value);
        }
      }
    });
  }
}

/**
 * Update card type icons based on card number
 * @param {string} cardNumber - Credit card number
 */
function updateCardTypeIcons(cardNumber) {
  const cardTypes = document.querySelector('.card-types');
  if (!cardTypes) return;
  
  // Get the first digits to determine card type
  const firstDigits = cardNumber.replace(/\D/g, '').substring(0, 4);
  
  // Reset all icons to low opacity
  const icons = cardTypes.querySelectorAll('i');
  icons.forEach(icon => {
    icon.style.opacity = '0.3';
  });
  
  // Highlight the correct icon based on card number
  if (/^4/.test(firstDigits)) {
    // Visa
    cardTypes.querySelector('.fa-cc-visa').style.opacity = '1';
  } else if (/^5[1-5]/.test(firstDigits)) {
    // Mastercard
    cardTypes.querySelector('.fa-cc-mastercard').style.opacity = '1';
  } else if (/^3[47]/.test(firstDigits)) {
    // American Express
    cardTypes.querySelector('.fa-cc-amex').style.opacity = '1';
  }
}