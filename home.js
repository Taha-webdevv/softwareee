// Home page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Premium Software & E-books');
  
  // Load featured products
  loadFeaturedProducts();
  
  // Setup newsletter form
  setupNewsletterForm();
});

/**
 * Load featured products into the featured products grid
 */
function loadFeaturedProducts() {
  const featuredProductsGrid = document.getElementById('featured-products-grid');
  
  if (!featuredProductsGrid) return;
  
  const featuredProducts = getFeaturedProducts(4);
  
  if (featuredProducts.length === 0) {
    featuredProductsGrid.innerHTML = '<p class="no-products">No featured products available.</p>';
    return;
  }
  
  let html = '';
  
  featuredProducts.forEach(product => {
    html += `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.images[0]}" alt="${product.name}">
          <div class="product-category">${product.category === 'software' ? 'Software' : 'E-Book'}</div>
        </div>
        <div class="product-info">
          <h3 class="product-title">
            <a href="product-details.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-description">${truncateText(product.description, 100)}</p>
          <div class="product-meta">
            <div class="product-price">${formatCurrency(product.price)}</div>
            <div class="product-rating">
              ${createStarRating(product.rating)}
              <span>${product.rating}</span>
            </div>
          </div>
          <div class="product-actions">
            <a href="product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    `;
  });
  
  featuredProductsGrid.innerHTML = html;
}

/**
 * Setup the newsletter form submission
 */
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
      // In a real application, this would send the email to a server
      // For this demo, we'll just show a success message
      
      // Show success notification
      showNotification('Thanks for subscribing to our newsletter!', 'success');
      
      // Clear the form
      newsletterForm.reset();
    }
  });
}