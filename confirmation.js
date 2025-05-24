// Order confirmation page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Order Confirmation');
  
  // Get order ID from URL
  const params = getUrlParams();
  const orderId = params.order;
  
  if (!orderId) {
    // No order ID, redirect to home page
    window.location.href = 'index.html';
    return;
  }
  
  // Load order details
  loadOrderDetails(orderId);
  
  // Setup print receipt button
  const printReceiptBtn = document.getElementById('print-receipt');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }
});

/**
 * Load order details
 * @param {string} orderId - Order ID to load
 */
function loadOrderDetails(orderId) {
  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  
  // Find the specific order
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    // Order not found, redirect to home page
    window.location.href = 'index.html';
    return;
  }
  
  // Update order information
  updateOrderInfo(order);
  
  // Load order items
  loadOrderItems(order);
  
  // Show download instructions if applicable
  showDownloadInstructions(order);
}

/**
 * Update order information in the UI
 * @param {Object} order - Order object
 */
function updateOrderInfo(order) {
  const orderNumberElement = document.getElementById('order-number');
  const orderDateElement = document.getElementById('order-date');
  const customerEmailElement = document.getElementById('customer-email');
  
  if (orderNumberElement) {
    orderNumberElement.textContent = `#${order.id}`;
  }
  
  if (orderDateElement) {
    orderDateElement.textContent = formatDate(order.date);
  }
  
  if (customerEmailElement) {
    customerEmailElement.textContent = order.email;
  }
}

/**
 * Load order items in the confirmation page
 * @param {Object} order - Order object
 */
function loadOrderItems(order) {
  const confirmationItemsContainer = document.getElementById('confirmation-items');
  const subtotalElement = document.getElementById('confirmation-subtotal');
  const taxElement = document.getElementById('confirmation-tax');
  const totalElement = document.getElementById('confirmation-total');
  
  if (!confirmationItemsContainer) return;
  
  // Build confirmation items HTML
  let html = '';
  
  order.items.forEach(item => {
    html += `
      <div class="confirmation-item">
        <div class="confirmation-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="confirmation-item-details">
          <div class="confirmation-item-title">${item.name}</div>
          <div class="confirmation-item-price">
            <span>${formatCurrency(item.price)} × ${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  confirmationItemsContainer.innerHTML = html;
  
  // Update summary
  if (subtotalElement) {
    subtotalElement.textContent = formatCurrency(order.subtotal);
  }
  
  if (taxElement) {
    taxElement.textContent = formatCurrency(order.tax);
  }
  
  if (totalElement) {
    totalElement.textContent = formatCurrency(order.total);
  }
}

/**
 * Show download instructions if applicable
 * @param {Object} order - Order object
 */
function showDownloadInstructions(order) {
  const downloadInstructionsContainer = document.getElementById('download-instructions');
  
  if (!downloadInstructionsContainer) return;
  
  // Check if order contains software or ebooks
  const softwareItems = order.items.filter(item => item.category === 'software');
  const ebookItems = order.items.filter(item => item.category === 'ebooks');
  
  let html = '';
  
  // Show instructions for software
  if (softwareItems.length > 0) {
    html += `
      <h3><i class="fas fa-download"></i> Software Download Instructions</h3>
      <p>Your software purchases are available for immediate download. You'll also receive an email with download links and license keys.</p>
      
      <div class="download-links">
    `;
    
    softwareItems.forEach(item => {
      html += `
        <div class="download-link">
          <div class="download-link-icon">
            <i class="fas fa-laptop-code"></i>
          </div>
          <div class="download-link-info">
            <div class="download-link-title">${item.name}</div>
            <div class="download-link-meta">License Key: XXXX-XXXX-XXXX-${generateRandomString(4)}</div>
          </div>
          <button class="download-link-btn">Download</button>
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  // Show instructions for ebooks
  if (ebookItems.length > 0) {
    html += `
      <h3><i class="fas fa-book"></i> E-Book Download Instructions</h3>
      <p>Your e-book purchases are available for immediate download in multiple formats. You'll also receive an email with download links.</p>
      
      <div class="download-links">
    `;
    
    ebookItems.forEach(item => {
      html += `
        <div class="download-link">
          <div class="download-link-icon">
            <i class="fas fa-book"></i>
          </div>
          <div class="download-link-info">
            <div class="download-link-title">${item.name}</div>
            <div class="download-link-meta">Available formats: PDF, EPUB, MOBI</div>
          </div>
          <div class="download-format-buttons">
            <button class="download-link-btn">PDF</button>
            <button class="download-link-btn">EPUB</button>
            <button class="download-link-btn">MOBI</button>
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  if (html) {
    downloadInstructionsContainer.innerHTML = html;
    
    // Add event listeners to download buttons
    const downloadButtons = downloadInstructionsContainer.querySelectorAll('.download-link-btn');
    downloadButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Simulate download start
        button.textContent = 'Downloading...';
        button.disabled = true;
        
        // Simulate download completion
        setTimeout(() => {
          button.textContent = 'Downloaded';
          showNotification('Download started. Check your downloads folder.', 'success');
        }, 1500);
      });
    });
  } else {
    downloadInstructionsContainer.style.display = 'none';
  }
}

/**
 * Generate a random string of specified length
 * @param {number} length - Length of string to generate
 * @returns {string} - Random string
 */
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}