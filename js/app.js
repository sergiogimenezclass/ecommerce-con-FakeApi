import { fetchProducts, fetchCategories, fetchUserProfile, fetchProductsByCategory } from './api.js';
import { renderGallery, renderCategories } from './gallery.js';
import { initModal, openModal } from './modal.js';
import { initVoiceSearch } from './voiceSearch.js';
import { initCart, addToCart } from './cart.js';
import { initProfile, renderProfile } from './profile.js';
import { initTheme } from './theme.js';
import { initControls, getControlParams, sortProducts, paginateProducts } from './controls.js';
import { renderPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', () => {
    let rawFetchedProducts = [];
    let activeCategory = 'all';
    let currentPage = 1;
    
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const micBtn = document.getElementById('mic-btn');
    const searchStatus = document.getElementById('search-status');
    const galleryContainer = document.getElementById('product-gallery');
    const statusMessage = document.getElementById('status-message');
    const categoryFilters = document.getElementById('category-filters');
    const paginationContainer = document.getElementById('pagination-container');

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

    // Procesa el ordenamiento y paginación sobre la lista de productos activa
    function renderProcessedProducts() {
        const { sort, limit } = getControlParams(controlsElements);

        // 1. Ordenar productos
        const sorted = sortProducts(rawFetchedProducts, sort);

        // 2. Paginar productos
        const paginated = paginateProducts(sorted, currentPage, limit);

        // 3. Renderizar galería con la página actual
        renderGallery(
            paginated, 
            galleryContainer, 
            statusMessage, 
            (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
            addToCart
        );

        // 4. Renderizar la botonera de paginación
        renderPagination(
            sorted.length, 
            currentPage, 
            limit, 
            paginationContainer, 
            (newPage) => {
                currentPage = newPage;
                renderProcessedProducts();
            }
        );
    }

    // Solicita datos a la API según categoría
    async function loadProducts(resetPage = true) {
        try {
            if (resetPage) {
                currentPage = 1;
            }

            statusMessage.textContent = 'Cargando productos...';
            statusMessage.style.display = 'block';
            galleryContainer.style.display = 'none';

            if (activeCategory === 'all') {
                rawFetchedProducts = await fetchProducts();
            } else {
                rawFetchedProducts = await fetchProductsByCategory(activeCategory);
            }

            renderProcessedProducts();
        } catch (error) {
            console.error('Error al cargar productos:', error);
            statusMessage.textContent = 'Error al cargar los productos. Por favor, intente nuevamente.';
            statusMessage.style.display = 'block';
            galleryContainer.style.display = 'none';
            if (paginationContainer) paginationContainer.style.display = 'none';
        }
    }

    // Escuchar cambios en los controles de ordenamiento y límite
    initControls(controlsElements, () => {
        currentPage = 1;
        renderProcessedProducts();
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

            // Cargar productos iniciales
            await loadProducts(true);

            // Cargar y renderizar categorías
            const categories = await fetchCategories();
            renderCategories(
                categories, 
                categoryFilters, 
                async (categoryName) => {
                    activeCategory = categoryName;
                    await loadProducts(true);
                }
            );

            // Inicializar búsqueda por voz
            initVoiceSearch(
                micBtn, 
                searchStatus, 
                () => rawFetchedProducts, 
                (filteredProducts) => {
                    currentPage = 1;
                    renderGallery(
                        paginateProducts(filteredProducts, 1, getControlParams(controlsElements).limit), 
                        galleryContainer, 
                        statusMessage, 
                        (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                        addToCart
                    );
                    renderPagination(
                        filteredProducts.length, 
                        1, 
                        getControlParams(controlsElements).limit, 
                        paginationContainer, 
                        (newPage) => {
                            currentPage = newPage;
                            const newPaginated = paginateProducts(filteredProducts, newPage, getControlParams(controlsElements).limit);
                            renderGallery(
                                newPaginated, 
                                galleryContainer, 
                                statusMessage, 
                                (productId) => openModal(productId, modalOverlay, modalBody, addToCart),
                                addToCart
                            );
                        }
                    );
                }
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
