document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters to determine which product to show
  const urlParams = new URLSearchParams(window.location.search);
  const productType = urlParams.get('type');
  
  const tshirtContainer = document.getElementById('bumpsale-tshirt-container');
  const capContainer = document.getElementById('bumpsale-cap-container');
  
  const productTitle = document.getElementById('product-title');
  const productDescription = document.getElementById('product-description');
  const specialPriceContainer = document.getElementById('special-price-container');
  const specialPrice = document.getElementById('special-price');
  
  // Get image containers
  const tshirtImage = document.getElementById('tshirt-image');
  const capImage = document.getElementById('cap-image');
  const otherImage = document.getElementById('other-image');
  
  // Initially hide all containers and images
  tshirtContainer.style.display = 'none';
  capContainer.style.display = 'none';
  tshirtImage.style.display = 'none';
  capImage.style.display = 'none';
  otherImage.style.display = 'none';
  
  // Show the appropriate product based on the URL parameter
  if (productType === 'tshirt') {
    // Display the T-shirt
    productTitle.textContent = 'Vibe Conference T-Shirt';
    productDescription.textContent = 'Show your support for the Vibe Coding Conference with our official t-shirt. Made from premium quality cotton with the conference logo printed on the front. Available for pickup at the conference.';
    specialPrice.textContent = '$5.00';
    tshirtContainer.style.display = 'block';
    tshirtImage.style.display = 'flex';
    otherImage.style.display = 'none';
  } 
  else if (productType === 'cap') {
    // Display the Cap
    productTitle.textContent = 'Vibe Conference Cap';
    productDescription.textContent = 'Stay cool and stylish with our official Vibe Coding Conference cap. Featuring an adjustable strap for perfect fit and the conference logo embroidered on the front. Available for pickup at the conference.';
    specialPrice.textContent = '$1.00';
    capContainer.style.display = 'block';
    tshirtImage.style.display = 'none';
    capImage.style.display = 'flex';
    otherImage.style.display = 'none';
  }
  else {
    // If no parameter or invalid parameter, redirect to merchandise page
    productTitle.textContent = 'Vibe Conference Merchandise';
    productDescription.textContent = 'Please select a merchandise item from the main merchandise page.';
    specialPriceContainer.style.display = 'none';
    tshirtImage.style.display = 'none';
    capImage.style.display = 'none';
    otherImage.style.display = 'flex';
    window.setTimeout(() => {
      window.location.href = '/#merchandise';
    }, 3000);
  }
});