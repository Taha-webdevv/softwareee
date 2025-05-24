// Product details page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Get product ID from URL
  const params = getUrlParams();
  const productId = params.id ? parseInt(params.id) : null;
  
  if (!productId) {
    // No product ID provided, redirect to products page
    window.location.href = 'products.html';
    return;
  }
  
  // Load product details
  loadProductDetails(productId);
  
  // Load related products
  loadRelatedProducts(productId);
});

/**
 * Load product details
 * @param {number} productId - Product ID to load
 */
function loadProductDetails(productId) {
  const product = getProductById(productId);
  const productDetailsContainer = document.getElementById('product-details');
  const breadcrumbName = document.getElementById('product-breadcrumb-name');
  
  if (!product || !productDetailsContainer) {
    // Product not found or container not present
    if (productDetailsContainer) {
      productDetailsContainer.innerHTML = `
        <div class="error-message">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <a href="products.html" class="btn btn-primary">Browse Products</a>
        </div>
      `;
    }
    return;
  }
  
  // Set page title
  setPageTitle(product.name);
  
  // Update breadcrumb
  if (breadcrumbName) {
    breadcrumbName.textContent = product.name;
  }
  
  // Create HTML for product details
  let html = `
    <div class="product-gallery">
      <div class="product-main-image">
        <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
      </div>
      <div class="product-thumbnails">
  `;
  
  // Add thumbnails
  product.images.forEach((image, index) => {
    html += `
      <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
        <img src="${image}" alt="${product.name} image ${index + 1}">
      </div>
    `;
  });
  
  html += `
      </div>
    </div>
    <div class="product-content">
      <div class="product-badges">
        ${product.bestSeller ? '<span class="badge badge-primary">Best Seller</span>' : ''}
        ${product.new ? '<span class="badge badge-secondary">New</span>' : ''}
        ${product.featured ? '<span class="badge badge-accent">Featured</span>' : ''}
      </div>
      <h1>${product.name}</h1>
      <div class="product-meta">
        <div class="product-rating">
          ${createStarRating(product.rating)}
          <span>${product.rating}</span>
        </div>
        <div class="product-reviews">
          ${product.reviews} reviews
        </div>
      </div>
      <div class="product-price">
        ${formatCurrency(product.price)}
      </div>
      <div class="product-description">
        <p>${product.description}</p>
      </div>
      <div class="product-features">
        <h3>Key Features</h3>
        <ul class="features-list">
  `;
  
  // Add features
  product.features.forEach(feature => {
    html += `<li>${feature}</li>`;
  });
  
  html += `
        </ul>
      </div>
  `;
  
  // Add system requirements for software
  if (product.category === 'software' && product.systemRequirements) {
    html += `
      <div class="system-requirements">
        <h3>System Requirements</h3>
        <ul class="requirements-list">
          <li><strong>OS:</strong> <span>${product.systemRequirements.os}</span></li>
          <li><strong>Processor:</strong> <span>${product.systemRequirements.processor}</span></li>
          <li><strong>Memory:</strong> <span>${product.systemRequirements.memory}</span></li>
          <li><strong>Storage:</strong> <span>${product.systemRequirements.storage}</span></li>
          ${product.systemRequirements.graphics ? `<li><strong>Graphics:</strong> <span>${product.systemRequirements.graphics}</span></li>` : ''}
          ${product.systemRequirements.additional ? `<li><strong>Additional:</strong> <span>${product.systemRequirements.additional}</span></li>` : ''}
        </ul>
      </div>
      <div class="download-info">
        <p>
          <strong>Download Size:</strong> ${product.downloadSize} • 
          <strong>Released:</strong> ${formatDate(product.releaseDate)}
        </p>
      </div>
    `;
  }
  
  // Add ebook info
  if (product.category === 'ebooks') {
    html += `
      <div class="ebook-info">
        <p>
          <strong>Pages:</strong> ${product.pages} • 
          <strong>Format:</strong> ${product.format} • 
          <strong>Released:</strong> ${formatDate(product.releaseDate)}
        </p>
      </div>
    `;
  }
  
  // Add quantity control and buttons
  html += `
      <div class="product-actions">
        <div class="quantity-control">
          <label for="quantity">Quantity:</label>
          <div class="quantity-input">
            <button type="button" id="decrease-quantity"><i class="fas fa-minus"></i></button>
            <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
            <button type="button" id="increase-quantity"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="product-buttons">
          <button type="button" id="add-to-cart" class="btn btn-primary">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <a href="products.html" class="btn btn-secondary">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  `;
  
  // Update container
  productDetailsContainer.innerHTML = html;
  
  // Setup thumbnail click handlers
  setupThumbnailClicks();
  
  // Setup quantity buttons
  setupQuantityControls();
  
  // Setup add to cart button
  setupAddToCartButton(product);
}

/**
 * Setup thumbnail click handlers
 */
function setupThumbnailClicks() {
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.getElementById('main-product-image');
  
  if (!thumbnails.length || !mainImage) return;
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      thumbnail.classList.add('active');
      
      // Update main image
      mainImage.src = thumbnail.dataset.image;
      
      // Add fade effect
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.style.opacity = '1';
      }, 50);
    });
  });
}

/**
 * Setup quantity control buttons
 */
function setupQuantityControls() {
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('quantity');
  
  if (!decreaseBtn || !increaseBtn || !quantityInput) return;
  
  // Decrease quantity
  decreaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });
  
  // Increase quantity
  increaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
      quantityInput.value = quantity + 1;
    }
  });
  
  // Validate input on change
  quantityInput.addEventListener('change', () => {
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity < 1) {
      quantityInput.value = 1;
    } else if (quantity > 10) {
      quantityInput.value = 10;
    }
  });
}

/**
 * Setup add to cart button
 * @param {Object} product - Product to add to cart
 */
function setupAddToCartButton(product) {
  const addToCartBtn = document.getElementById('add-to-cart');
  const quantityInput = document.getElementById('quantity');
  
  if (!addToCartBtn || !quantityInput) return;
  
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    
    if (quantity > 0) {
      // Add to cart
      addToCart(product, quantity);
      
      // Add animation
      animateElement(addToCartBtn, 'pulse');
    }
  });
}

/**
 * Load related products
 * @param {number} productId - Current product ID
 */
function loadRelatedProducts(productId) {
  const relatedProductsContainer = document.getElementById('related-products');
  
  if (!relatedProductsContainer) return;
  
  const relatedProducts = getRelatedProducts(productId, 4);
  
  if (relatedProducts.length === 0) {
    relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
    return;
  }
  
  let html = '';
  
  relatedProducts.forEach(product => {
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
          <p class="product-description">${truncateText(product.description, 80)}</p>
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
  
  relatedProductsContainer.innerHTML = html;
}