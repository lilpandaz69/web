// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productDetailsContainer = document.getElementById("product-details");
const loader = document.getElementById("loader");

window.onload = function () {
  window.scrollTo(0, 0); // Scroll to top when page is loaded
};

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function fetchProducts() {
  showLoader(); // Show the loader while fetching the data
  fetch(`https://fakestoreapi.com/products/${productId}`) // Corrected URL
    .then((response) => response.json())
    .then((product) => {
      let productDetails = '';

      // Use the fetched product to create the HTML
      productDetails += `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p class="price"><strong>Price:</strong> $${product.price}</p>
            <div class="product-rating">
              ${getStarIcons(product.rating.rate)}
            </div>
            <button class="view-details"><a class="nav-link text-light" href="/index.html">Home</a></button>
            <button class="view-details">Add to Cart</button>
          </div>
        </div>
      `;

      // Add the HTML to the container
      productDetailsContainer.innerHTML = productDetails;
      hideLoader(); // Hide the loader after data is loaded
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
      hideLoader(); // Hide the loader even if there is an error
    });
}

function getStarIcons(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (halfStar === 1) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Fetch the product details on page load
fetchProducts();
