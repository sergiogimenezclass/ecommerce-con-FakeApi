export function renderCheckoutTicket(orderData, cartItems, totalAmount, modalOverlay, modalBody) {
    if (!modalOverlay || !modalBody) return;

    const orderId = orderData.id || 11;
    const orderDate = orderData.date || new Date().toISOString().split('T')[0];
    const items = Array.isArray(cartItems) ? cartItems : [];

    const itemsRowsHTML = items.map(item => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemSubtotal = itemPrice * itemQty;

        return `
            <tr>
                <td class="ticket-prod-cell">
                    <img src="${item.image}" alt="${item.title}" class="ticket-prod-img" />
                    <span class="ticket-prod-title">${item.title}</span>
                </td>
                <td class="ticket-num-cell">${itemQty}</td>
                <td class="ticket-num-cell">$${itemPrice.toFixed(2)}</td>
                <td class="ticket-num-cell font-bold">$${itemSubtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    modalBody.innerHTML = `
        <div class="checkout-ticket">
            <div class="ticket-header">
                <div class="ticket-icon">✅</div>
                <h2 class="ticket-title">¡Compra Realizada con Éxito!</h2>
                <p class="ticket-subtitle">Orden <strong>#ORD-${orderId}</strong> &bull; Fecha: <strong>${orderDate}</strong></p>
            </div>

            <div class="ticket-table-wrapper">
                <table class="ticket-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Precio U.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsRowsHTML}
                    </tbody>
                </table>
            </div>

            <div class="ticket-footer">
                <div class="ticket-status-badge">
                    <span class="pulse-dot"></span> FakeStoreAPI 200 OK
                </div>
                <div class="ticket-total">
                    <span>Total Abonado:</span>
                    <strong class="ticket-total-price">$${Number(totalAmount).toFixed(2)}</strong>
                </div>
            </div>

            <button id="continue-shopping-btn" class="continue-btn">
                Continuar Comprando
            </button>
        </div>
    `;

    modalOverlay.style.display = 'flex';

    const continueBtn = document.getElementById('continue-shopping-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    }
}
