// Form validation utilities

/**
 * Validate an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a name (at least 2 characters, letters, spaces, hyphens)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidName(name) {
  const nameRegex = /^[A-Za-z\s\-']{2,}$/;
  return nameRegex.test(name);
}

/**
 * Validate a credit card number (remove spaces, check length and Luhn algorithm)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidCreditCard(cardNumber) {
  // Remove spaces and dashes
  const digitsOnly = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(digitsOnly)) return false;
  
  // Check length (most card types are 13-19 digits)
  if (digitsOnly.length < 13 || digitsOnly.length > 19) return false;
  
  // Luhn algorithm validation
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through values starting from the rightmost digit
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let digit = parseInt(digitsOnly.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return (sum % 10) === 0;
}

/**
 * Validate a credit card expiry date (MM/YY format, not expired)
 * @param {string} expiry - Expiry date to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidExpiryDate(expiry) {
  // Check format (MM/YY)
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
  
  const [month, year] = expiry.split('/').map(part => parseInt(part, 10));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  
  // Check if month is valid (1-12)
  if (month < 1 || month > 12) return false;
  
  // Check if the card is not expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
  
  return true;
}

/**
 * Validate CVV (3-4 digits)
 * @param {string} cvv - CVV to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

/**
 * Validate a zip/postal code (US/Canada format)
 * @param {string} zip - Zip/postal code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidZipCode(zip) {
  // US zip code: 5 digits or 5+4 digits
  const usZipRegex = /^\d{5}(-\d{4})?$/;
  
  // Canadian postal code: A1A 1A1 or A1A1A1
  const canadianPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  
  return usZipRegex.test(zip) || canadianPostalRegex.test(zip);
}

/**
 * Format credit card number with spaces every 4 digits
 * @param {string} value - Credit card number to format
 * @returns {string} - Formatted credit card number
 */
function formatCreditCardNumber(value) {
  const digitsOnly = value.replace(/\D/g, '');
  const groups = [];
  
  for (let i = 0; i < digitsOnly.length; i += 4) {
    groups.push(digitsOnly.slice(i, i + 4));
  }
  
  return groups.join(' ');
}

/**
 * Format expiry date with slash (MM/YY)
 * @param {string} value - Expiry date to format
 * @returns {string} - Formatted expiry date
 */
function formatExpiryDate(value) {
  const digitsOnly = value.replace(/\D/g, '');
  
  if (digitsOnly.length <= 2) {
    return digitsOnly;
  }
  
  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`;
}

/**
 * Validate form and show errors
 * @param {HTMLFormElement} form - Form to validate
 * @param {Object} validations - Validation rules for each field
 * @returns {boolean} - True if valid, false otherwise
 */
function validateForm(form, validations) {
  let isValid = true;
  
  for (const fieldName in validations) {
    const field = form.elements[fieldName];
    const validationRule = validations[fieldName];
    const errorElement = form.querySelector(`[name="${fieldName}"] + .error-message`);
    
    // Skip if field doesn't exist
    if (!field) continue;
    
    // Clear previous error
    field.classList.remove('error');
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    // Apply validation rule
    let fieldValid = true;
    let errorMessage = '';
    
    switch (validationRule.type) {
      case 'required':
        fieldValid = field.value.trim() !== '';
        errorMessage = 'This field is required';
        break;
      case 'email':
        fieldValid = isValidEmail(field.value);
        errorMessage = 'Please enter a valid email address';
        break;
      case 'name':
        fieldValid = isValidName(field.value);
        errorMessage = 'Please enter a valid name';
        break;
      case 'creditCard':
        fieldValid = isValidCreditCard(field.value);
        errorMessage = 'Please enter a valid credit card number';
        break;
      case 'expiry':
        fieldValid = isValidExpiryDate(field.value);
        errorMessage = 'Please enter a valid expiry date (MM/YY)';
        break;
      case 'cvv':
        fieldValid = isValidCVV(field.value);
        errorMessage = 'Please enter a valid CVV (3-4 digits)';
        break;
      case 'zip':
        fieldValid = isValidZipCode(field.value);
        errorMessage = 'Please enter a valid zip/postal code';
        break;
      case 'select':
        fieldValid = field.value !== '';
        errorMessage = 'Please select an option';
        break;
      case 'custom':
        fieldValid = validationRule.validator(field.value);
        errorMessage = validationRule.message || 'Invalid value';
        break;
    }
    
    // If custom error message is provided, use it
    if (validationRule.message && !fieldValid) {
      errorMessage = validationRule.message;
    }
    
    // Show error if invalid
    if (!fieldValid) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
      isValid = false;
    }
  }
  
  return isValid;
}

/**
 * Setup input formatting for specific fields
 * @param {HTMLElement} container - Container with input fields
 */
function setupInputFormatting(container) {
  if (!container) return;
  
  // Credit card number formatting
  const cardNumberInput = container.querySelector('#card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function() {
      const cursorPosition = this.selectionStart;
      const value = this.value.replace(/\s/g, '');
      const formattedValue = formatCreditCardNumber(value);
      
      // Update value and cursor position
      this.value = formattedValue;
      
      // Adjust cursor position based on added spaces
      const newCursorPosition = cursorPosition + (formattedValue.length - value.length);
      this.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  }
  
  // Expiry date formatting
  const expiryInput = container.querySelector('#expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', function() {
      const cursorPosition = this.selectionStart;
      const value = this.value.replace(/\//g, '');
      const formattedValue = formatExpiryDate(value);
      
      // Update value
      this.value = formattedValue;
      
      // Adjust cursor position
      if (cursorPosition === 3 && formattedValue.length === 5) {
        this.setSelectionRange(4, 4);
      }
    });
  }
}