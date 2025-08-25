
async function getProducts() {
    var data = await fetch('https://dummyjson.com/products');
    var products = await data.json();

    displayProducts(products.products)
}

function displayProducts(products) {

    var data = '';

    products.forEach(function (product) {
        data += `
            <div class="product-card">
                    <div class="product-image">
                        <img src="${ product.thumbnail }" alt="Wireless Headphones">
                        <div class="product-badge">New</div>
                        <div class="product-actions">
                            <button class="action-btn"><i class="fas fa-heart"></i></button>
                            <button class="action-btn"><i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${ product.title }</h3>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <span>(${product.rating})</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$${ product.price }</span>
                            <span class="original-price">$129.99</span>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
        `;
    });

    document.getElementById('products-grid').innerHTML = data;
}

getProducts();