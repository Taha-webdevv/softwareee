// Products page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Products');
  
  // Get filter elements
  const filterButtons = document.querySelectorAll('.filter-btn');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  const ratingButtons = document.querySelectorAll('.rating-btn');
  const sortSelect = document.getElementById('sort-select');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  // Get URL parameters
  const params = getUrlParams();
  
  // Initialize filters
  let currentFilters = {
    category: params.category || 'all',
    maxPrice: 200,
    minRating: 0,
    sortBy: 'featured',
    search: ''
  };
  
  // Apply initial category filter from URL if present
  if (params.category) {
    document.querySelector(`.filter-btn[data-category="${params.category}"]`)?.classList.add('active');
    document.querySelector('.filter-btn[data-category="all"]')?.classList.remove('active');
  }
  
  // Load products with current filters
  loadProducts();
  
  // Add event listeners for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all category buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current filter
      currentFilters.category = button.dataset.category;
      
      // Load filtered products
      loadProducts();
    });
  });
  
  // Add event listener for price filter
  if (priceFilter && priceValue) {
    priceFilter.addEventListener('input', () => {
      const price = parseInt(priceFilter.value);
      priceValue.textContent = price >= 200 ? '$200+' : `$${price}`;
      
      // Update current filter
      currentFilters.maxPrice = price;
      
      // Debounce to prevent too many reloads
      debounce(() => loadProducts(), 300)();
    });
  }
  
  // Add event listeners for rating filter buttons
  ratingButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update visual state (could add active class here)
      ratingButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update current filter
      currentFilters.minRating = parseInt(button.dataset.rating);
      
      // Load filtered products
      loadProducts();
    });
  });
  
  // Add event listener for sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      // Update current filter
      currentFilters.sortBy = sortSelect.value;
      
      // Load sorted products
      loadProducts();
    });
  }
  
  // Add event listener for clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      // Reset filters
      currentFilters = {
        category: 'all',
        maxPrice: 200,
        minRating: 0,
        sortBy: 'featured',
        search: ''
      };
      
      // Reset UI
      filterButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
      
      if (priceFilter && priceValue) {
        priceFilter.value = 200;
        priceValue.textContent = '$200+';
      }
      
      ratingButtons.forEach(btn => btn.classList.remove('active'));
      
      if (sortSelect) {
        sortSelect.value = 'featured';
      }
      
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Load all products
      loadProducts();
    });
  }
  
  // Add event listener for search
  if (searchInput && searchBtn) {
    // Search on button click
    searchBtn.addEventListener('click', () => {
      currentFilters.search = searchInput.value.trim();
      loadProducts();
    });
    
    // Search on Enter key
    searchInput.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        currentFilters.search = searchInput.value.trim();
        loadProducts();
      }
    });
  }
  
  /**
   * Load products with current filters
   */
  function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const productCount = document.getElementById('product-count');
    const noResults = document.getElementById('no-results');
    
    if (!productsGrid) return;
    
    // Show loading spinner
    productsGrid.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>
    `;
    
    // Get all products
    let filteredProducts = getProductsByCategory(currentFilters.category === 'all' ? null : currentFilters.category);
    
    // Apply search filter
    if (currentFilters.search) {
      filteredProducts = searchProducts(currentFilters.search).filter(p => 
        currentFilters.category === 'all' || p.category === currentFilters.category
      );
    }
    
    // Apply price filter
    if (currentFilters.maxPrice < 200) {
      filteredProducts = filteredProducts.filter(p => p.price <= currentFilters.maxPrice);
    }
    
    // Apply rating filter
    if (currentFilters.minRating > 0) {
      filteredProducts = filteredProducts.filter(p => p.rating >= currentFilters.minRating);
    }
    
    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentFilters.sortBy);
    
    // Simulate a network delay for demonstration purposes
    setTimeout(() => {
      // Update product count
      if (productCount) {
        productCount.textContent = filteredProducts.length;
      }
      
      // Show products or no results message
      if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        if (noResults) {
          noResults.classList.remove('hidden');
        }
      } else {
        if (noResults) {
          noResults.classList.add('hidden');
        }
        
        let html = '';
        
        filteredProducts.forEach(product => {
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
        
        productsGrid.innerHTML = html;
      }
    }, 500); // Simulate loading delay
  }
});