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

document.addEventListener("DOMContentLoaded", renderProducts);

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

document.addEventListener("DOMContentLoaded", renderProductPage);