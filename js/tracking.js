window.dataLayer = window.dataLayer || [];
const originalPush = dataLayer.push;

dataLayer.push = function () {

    const event = arguments[0];

    if (event.event) {
        debugEvent(event.event);
    }

    return originalPush.apply(dataLayer, arguments);

};

function beginCheckout() {

    dataLayer.push({ ecommerce: null });

    dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
            currency: "USD",
            value: getCartTotal()
        }
    });

    window.location.href = "checkout.html";
}

function purchase() {

    const items = getCartItemsForGA4();
    const total = getCartTotal();

    dataLayer.push({ ecommerce: null });

    dataLayer.push({
        event: "purchase",
        ecommerce: {
            transaction_id: generateTransactionId(),
            affiliation: "SportShop Online",
            value: total,
            tax: total * 0.1,
            shipping: 5,
            currency: "USD",
            items: items
        }
    });

    // limpiar carrito después de comprar
    localStorage.removeItem("cart");
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function getCartItemsForGA4() {

    const cart = getCart();

    return cart.map(product => ({
        item_id: product.id,
        item_name: product.name,
        price: Number(product.price),
        quantity: 1
    }));
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

    dataLayer.push({ ecommerce: null });

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

function getCartTotal() {

    return getCart().reduce(
        (total, product) => total + Number(product.price),
        0
    );
}

function generateTransactionId() {
    return "ORDER-" + Date.now();
}