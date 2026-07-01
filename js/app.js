import { fetchProducts, fetchCategories, fetchUserProfile } from './api.js';
import { renderGallery, renderCategories } from './gallery.js';
import { initModal, openModal } from './modal.js';
import { initVoiceSearch } from './voiceSearch.js';
import { initCart, addToCart } from './cart.js';
import { initProfile, renderProfile } from './profile.js';

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

    // Elementos del perfil de usuario
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileName = document.getElementById('profile-name');
    const dropdownFullname = document.getElementById('dropdown-fullname');
    const dropdownEmail = document.getElementById('dropdown-email');
    const dropdownPhone = document.getElementById('dropdown-phone');
    const dropdownAddress = document.getElementById('dropdown-address');

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
    initProfile({ profileBtn, profileDropdown });

    async function loadApp() {
        try {
            // Cargar perfil de usuario (tolerante a fallos)
            try {
                const user = await fetchUserProfile(1);
                renderProfile(user, {
                    profileName,
                    dropdownFullname,
                    dropdownEmail,
                    dropdownPhone,
                    dropdownAddress
                });
            } catch (userError) {
                console.error('Error al cargar perfil de usuario:', userError);
                if (profileName) profileName.textContent = 'Usuario';
            }

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
