const productsContainer = document.getElementById("products-container");
const loader = document.getElementById("loader");
window.onload = function () {
  window.scrollTo(0, 0); // العودة إلى أعلى الصفحة
};
function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function fetchProducts() {
  showLoader();

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      hideLoader();
      products.forEach((product) => {
        // Loop to display each product twice
        for (let i = 0; i < 2; i++) {
          const rating = product.rating.rate;
          const starIcons = getStarIcons(rating);
          const productCard = `
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${
            product.title
          }">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description.substring(
                    0,
                    100
                  )}...</p>
                  <p><strong>Price:</strong> $${product.price}</p>
                  <div class="product-rating">
                    <span class="rating-stars">${starIcons}</span>
                    <span class="rating-number">(${rating})</span>
                  </div>
                  <button class="btn btn-primary view-details" onclick="viewDetails(${
                    product.id
                  })">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          `;

          productsContainer.innerHTML += productCard;
        }
      });
    })
    .catch((error) => {
      hideLoader();
      console.error("Error fetching products:", error);
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

function viewDetails(productId) {
  window.location.href = `product-details.html?id=${productId}`;
}

fetchProducts();
