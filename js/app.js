import { fetchProducts, fetchCategories, fetchUserProfile, fetchProductsByCategory } from './api.js';
import { renderGallery, renderCategories } from './gallery.js';
import { initModal, openModal } from './modal.js';
import { initVoiceSearch } from './voiceSearch.js';
import { initCart, addToCart } from './cart.js';
import { initProfile, renderProfile } from './profile.js';
import { initTheme } from './theme.js';
import { initControls, getControlParams } from './controls.js';

document.addEventListener('DOMContentLoaded', () => {
    let allProducts = [];
    let activeCategory = 'all';
    
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const micBtn = document.getElementById('mic-btn');
    const searchStatus = document.getElementById('search-status');
    const galleryContainer = document.getElementById('product-gallery');
    const statusMessage = document.getElementById('status-message');
    const categoryFilters = document.getElementById('category-filters');

    // Elementos de controles de ordenamiento y límite
    const sortSelect = document.getElementById('sort-select');
    const limitSelect = document.getElementById('limit-select');

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
    initTheme(themeToggleBtn);
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

    const controlsElements = { sortSelect, limitSelect };

    // Función auxiliar para solicitar y renderizar productos aplicando filtros/orden
    async function loadProducts(options = {}) {
        try {
            statusMessage.textContent = 'Cargando productos...';
            statusMessage.style.display = 'block';
            galleryContainer.style.display = 'none';

            const queryParams = Object.keys(options).length > 0 ? options : getControlParams(controlsElements);

            if (activeCategory === 'all') {
                allProducts = await fetchProducts(queryParams);
            } else {
                allProducts = await fetchProductsByCategory(activeCategory, queryParams);
            }

            renderGallery(
                allProducts, 
                galleryContainer, 
                statusMessage, 
                (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                addToCart
            );
        } catch (error) {
            console.error('Error al cargar productos:', error);
            statusMessage.textContent = 'Error al cargar los productos. Por favor, intente nuevamente.';
            statusMessage.style.display = 'block';
            galleryContainer.style.display = 'none';
        }
    }

    // Escuchar cambios en los controles de ordenamiento y límite
    initControls(controlsElements, async (params) => {
        await loadProducts(params);
    });

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

            // Cargar productos iniciales con query params
            await loadProducts();

            // Cargar y renderizar categorías
            const categories = await fetchCategories();
            renderCategories(
                categories, 
                categoryFilters, 
                async (categoryName) => {
                    activeCategory = categoryName;
                    await loadProducts();
                }
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
