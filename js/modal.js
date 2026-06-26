import { fetchProductDetail } from './api.js';

export function closeModal(modalOverlay, modalBody) {
    modalOverlay.style.display = 'none';
    modalBody.innerHTML = '';
}

export function initModal(modalOverlay, modalBody, closeModalBtn) {
    closeModalBtn.addEventListener('click', () => closeModal(modalOverlay, modalBody));

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal(modalOverlay, modalBody);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal(modalOverlay, modalBody);
        }
    });
}

export async function openModal(productId, modalOverlay, modalBody) {
    modalOverlay.style.display = 'flex';
    modalBody.innerHTML = '<div class="status-message">Cargando detalles del producto...</div>';

    try {
        const product = await fetchProductDetail(productId);
        
        modalBody.innerHTML = `
            <div class="modal-body-content">
                <div class="modal-image-container">
                    <img src="${product.image}" alt="${product.title}" class="modal-image">
                </div>
                <span class="product-category">${product.category}</span>
                <h2>${product.title}</h2>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <p class="modal-description">${product.description}</p>
                <div class="modal-rating">⭐ ${product.rating.rate} (${product.rating.count} reseñas)</div>
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar detalle:', error);
        modalBody.innerHTML = '<div class="status-message">Error al cargar los detalles. Intente nuevamente.</div>';
    }
}
