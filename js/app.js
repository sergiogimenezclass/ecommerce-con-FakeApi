import { fetchProducts, fetchCategories } from './api.js';
import { renderGallery, renderCategories } from './gallery.js';
import { initModal, openModal } from './modal.js';
import { initVoiceSearch } from './voiceSearch.js';
import { initCart, addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];
    
    const micBtn = document.getElementById('mic-btn');
    const searchStatus = document.getElementById('search-status');
    const galleryContainer = document.getElementById('product-gallery');
    const statusMessage = document.getElementById('status-message');
    const categoryFilters = document.getElementById('category-filters');

    // Elementos del modal
    const modalOverlay = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal');

    // Elementos del carrito
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartBadge = document.getElementById('cart-badge');

    // Inicializaciones
    initModal(modalOverlay, modalBody, closeModalBtn);
    initCart({
        cartToggleBtn,
        cartSidebar,
        cartOverlay,
        closeCartBtn,
        checkoutBtn,
        cartItemsContainer,
        cartTotalPrice,
        cartBadge
    });

    async function loadApp() {
        try {
            // Cargar productos
            allProducts = await fetchProducts();
            
            // Renderizar galería inicial
            renderGallery(
                allProducts, 
                galleryContainer, 
                statusMessage, 
                (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                addToCart
            );

            // Cargar y renderizar categorías
            const categories = await fetchCategories();
            renderCategories(
                categories, 
                allProducts, 
                categoryFilters, 
                (filteredProducts) => renderGallery(
                    filteredProducts, 
                    galleryContainer, 
                    statusMessage, 
                    (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                    addToCart
                )
            );

            // Inicializar búsqueda por voz
            initVoiceSearch(
                micBtn, 
                searchStatus, 
                () => allProducts, 
                (filteredProducts) => renderGallery(
                    filteredProducts, 
                    galleryContainer, 
                    statusMessage, 
                    (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                    addToCart
                )
            );

        } catch (error) {
            console.error('Error al cargar la aplicación:', error);
            statusMessage.textContent = 'Error al cargar la aplicación. Por favor, intente nuevamente.';
            statusMessage.style.display = 'block';
            galleryContainer.style.display = 'none';
        }
    }

    loadApp();
});
