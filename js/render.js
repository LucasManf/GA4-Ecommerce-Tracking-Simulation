document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("product-list")) {
        renderProducts();
    }

    if (document.getElementById("product-detail")) {
        renderProductPage();
    }
    
    if (document.getElementById("checkout-summary")) {
        renderCheckout();
    }
});

function renderProducts() {

    const container = document.getElementById("product-list");

    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
<img src="${product.image}">
<h3>${product.name}</h3>
<p>$${product.price}</p>
<button onclick="goToProduct('${product.id}')">
View Product
</button>
`;

        container.appendChild(card);

    });

}

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function getProductFromURL() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    return products.find(p => p.id === id);
}

function renderProductPage() {

    const product = getProductFromURL();
    if (!product) return;

    const container = document.getElementById("product-detail");

    container.innerHTML = `
<img src="${product.image}">
<h2>${product.name}</h2>
<p>$${product.price}</p>
<button onclick="addToCart('${product.id}')">
Add to Cart
</button>
`;

    viewProduct(product);

}

const container = document.getElementById("product-list");

function renderCheckout() {

    const container = document.getElementById("checkout-summary");
    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    let html = "<h2>Order Summary</h2>";

    cart.forEach(product => {
        html += `
            <div class="checkout-item">
                <span>${product.name}</span>
                <span>$${product.price}</span>
            </div>
        `;
    });

    html += `
        <hr>
        <h3>Total: $${getCartTotal()}</h3>
    `;

    container.innerHTML = html;
}
