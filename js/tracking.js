window.dataLayer = window.dataLayer || [];
const originalPush = dataLayer.push;

dataLayer.push = function () {

    const event = arguments[0];

    if (event.event) {
        debugEvent(event.event);
    }

    return originalPush.apply(dataLayer, arguments);

};

function viewProduct() {

    dataLayer.push({
        event: "view_item",
        ecommerce: {
            currency: "USD",
            value: 120,
            items: [{
                item_id: "shoe_01",
                item_name: "Running Shoes",
                price: 120,
                item_category: "Shoes",
                quantity: 1
            }]
        }
    })

}

function addToCart() {

    dataLayer.push({ ecommerce: null });

    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            currency: "USD",
            value: 120,
            items: [{
                item_id: "shoe_01",
                item_name: "Running Shoes",
                price: 120,
                quantity: 1
            }]
        }
    })

    window.location.href = "cart.html"

}

function beginCheckout() {

    dataLayer.push({ ecommerce: null });

    dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
            currency: "USD",
            value: 120
        }
    })

    window.location.href = "purchase.html"

}

function purchase() {

    dataLayer.push({ ecommerce: null });

    dataLayer.push({
        event: "purchase",
        ecommerce: {
            transaction_id: "ORDER123",
            affiliation: "SportShop Online",
            value: 120,
            tax: 10,
            shipping: 5,
            currency: "USD",
            items: [{
                item_id: "shoe_01",
                item_name: "Running Shoes",
                price: 120,
                item_category: "Shoes",
                quantity: 1
            }]
        }
    });

}

function debugEvent(eventName) {

    const panel = document.getElementById("debug-panel");
    if (!panel) return;
    // obtener eventos guardados
    let events = JSON.parse(localStorage.getItem("debugEvents")) || [];
    // agregar nuevo evento
    events.push(eventName);
    // guardar nuevamente
    localStorage.setItem("debugEvents", JSON.stringify(events));
    // mostrar eventos
    renderDebugPanel();
}

function renderDebugPanel() {

    const container = document.getElementById("debug-events");

    if (!container) return;

    let events = JSON.parse(localStorage.getItem("debugEvents")) || [];

    container.innerHTML = "";

    events.forEach(event => {

        const div = document.createElement("div");
        div.textContent = "Event fired: " + event;

        container.appendChild(div);

    });

}

document.addEventListener("DOMContentLoaded", function () {
    renderDebugPanel();
});

function clearDebug() {

    localStorage.removeItem("debugEvents");
    renderDebugPanel();

}

function viewProduct(product) {

    dataLayer.push({
        event: "view_item",
        ecommerce: {
            currency: "USD",
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price
            }]
        }
    });

}

function addToCart(productId) {
    // Buscar producto por ID
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Guardar en dataLayer para tracking
    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            currency: "USD",
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price,
                quantity: 1
            }]
        }
    });

    // Guardar en localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);  // agregamos el producto
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirigir al carrito
    window.location.href = "cart.html";
}