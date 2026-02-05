// Merchandise section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Fetch merchandise data from the API
  fetch('/api/merchandise')
    .then(response => response.json())
    .then(merchandise => {
      renderMerchandise(merchandise);
      setupTabFiltering();
    })
    .catch(error => {
      console.error('Error fetching merchandise:', error);
      document.getElementById('merchandise-loading').style.display = 'none';
      document.getElementById('merchandise-error').style.display = 'block';
    });
});

function renderMerchandise(merchandise) {
  const container = document.getElementById('merchandise-grid');
  const loadingEl = document.getElementById('merchandise-loading');
  
  // Hide loading spinner
  if (loadingEl) {
    loadingEl.style.display = 'none';
  }
  
  // Clear container
  container.innerHTML = '';
  
  if (!merchandise || merchandise.length === 0) {
    container.innerHTML = '<div class="col-span-3 text-center py-8"><p class="text-gray-500">No merchandise available at the moment.</p></div>';
    return;
  }
  
  // Create card for each merchandise item
  merchandise.forEach(item => {
    const card = document.createElement('div');
    card.className = 'merchandise-card';
    card.dataset.category = item.category; // For filtering
    
    // Create card image section
    const imgContainer = document.createElement('div');
    imgContainer.className = 'merchandise-image';
    
    if (item.imageUrl) {
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;
      imgContainer.appendChild(img);
    } else {
      const noImg = document.createElement('div');
      noImg.className = 'no-image';
      noImg.textContent = 'No image available';
      imgContainer.appendChild(noImg);
    }
    
    // Create card header
    const header = document.createElement('div');
    header.className = 'merchandise-header';
    
    const title = document.createElement('h3');
    title.className = 'merchandise-title';
    title.textContent = item.name;
    
    const description = document.createElement('p');
    description.className = 'merchandise-description';
    description.textContent = item.description;
    
    header.appendChild(title);
    header.appendChild(description);
    
    // Create card content
    const content = document.createElement('div');
    content.className = 'merchandise-content';
    
    // Add price or special BumpSale price text
    const priceContainer = document.createElement('div');
    priceContainer.className = 'merchandise-price-container';
    
    if (item.name === "Vibe Conference T-Shirt" || item.name === "Vibe Conference Cap") {
      // No price display for BumpSale items, the button will show the price
    } else {
      const price = document.createElement('span');
      price.className = 'merchandise-price';
      price.textContent = formatPrice(item.price);
      priceContainer.appendChild(price);
    }
    
    content.appendChild(priceContainer);
    
    // Create card footer with buttons
    const footer = document.createElement('div');
    footer.className = 'merchandise-footer';
    
    if (item.name === "Vibe Conference T-Shirt" || item.name === "Vibe Conference Cap") {
      // Use BumpSale Button
      const bumpSaleBtn = document.createElement('a');
      bumpSaleBtn.href = '#';
      bumpSaleBtn.className = 'bumpsale_button';
      bumpSaleBtn.setAttribute('data-bumpsale', 'EG5EMPuUgA8BukrLREGtmMys');
      bumpSaleBtn.setAttribute('data-bumpsale-text', 'Buy Now at _PRICE_');
      footer.appendChild(bumpSaleBtn);
    } else {
      // Regular purchase button
      const button = document.createElement('a');
      button.href = `/merchandise-checkout/${item.id}`;
      button.className = 'merchandise-button';
      button.textContent = 'Purchase Now';
      footer.appendChild(button);
    }
    
    // Assemble the card
    card.appendChild(imgContainer);
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    
    // Add to container
    container.appendChild(card);
  });
  
  // Reinitialize BumpSale buttons
  if (window.BumpSaleButtons && typeof window.BumpSaleButtons.init === 'function') {
    window.BumpSaleButtons.init();
  }
}

function setupTabFiltering() {
  const tabs = document.querySelectorAll('.merchandise-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      const category = this.dataset.category;
      filterMerchandise(category);
    });
  });
}

function filterMerchandise(category) {
  const cards = document.querySelectorAll('.merchandise-card');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
}