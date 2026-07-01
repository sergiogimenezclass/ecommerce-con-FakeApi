export let cart = [];

// Referencias de elementos del DOM que el módulo actualizará
let badgeElem = null;
let containerElem = null;
let totalElem = null;
let sidebarElem = null;
let overlayElem = null;

export function loadCart() {
    try {
        const storedCart = localStorage.getItem('cart');
        cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error('Error al cargar el carrito de localStorage:', e);
        cart = [];
    }
    updateCartUI();
}

export function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error al guardar el carrito en localStorage:', e);
    }
}

export function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Abre el carrito automáticamente para dar feedback al usuario
    if (sidebarElem && overlayElem) {
        openCart();
    }
}

export function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;

    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCartUI();
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

export function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

export function openCart() {
    if (sidebarElem && overlayElem) {
        sidebarElem.classList.add('open');
        overlayElem.classList.add('open');
    }
}

export function closeCart() {
    if (sidebarElem && overlayElem) {
        sidebarElem.classList.remove('open');
        overlayElem.classList.remove('open');
    }
}

export function updateCartUI() {
    // 1. Actualizar el Badge del Header
    if (badgeElem) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badgeElem.textContent = totalItems;
        badgeElem.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // 2. Actualizar el Contenedor de Ítems
    if (containerElem) {
        containerElem.innerHTML = '';
        
        if (cart.length === 0) {
            containerElem.innerHTML = '<div class="cart-empty-message">Tu carrito está vacío</div>';
        } else {
            cart.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'cart-item';
                
                itemRow.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                        <div class="cart-item-qty-controls">
                            <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;
                
                // Eventos de controles de cantidad
                itemRow.querySelector('.minus-btn').addEventListener('click', () => updateQuantity(item.id, -1));
                itemRow.querySelector('.plus-btn').addEventListener('click', () => updateQuantity(item.id, 1));
                itemRow.querySelector('.remove-item-btn').addEventListener('click', () => removeFromCart(item.id));
                
                containerElem.appendChild(itemRow);
            });
        }
    }

    // 3. Actualizar el Precio Total
    if (totalElem) {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalElem.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

export function initCart(elements) {
    const {
        cartToggleBtn,
        cartSidebar,
        cartOverlay,
        closeCartBtn,
        checkoutBtn,
        cartItemsContainer,
        cartTotalPrice,
        cartBadge
    } = elements;

    // Asignar referencias globales internas del módulo
    badgeElem = cartBadge;
    containerElem = cartItemsContainer;
    totalElem = cartTotalPrice;
    sidebarElem = cartSidebar;
    overlayElem = cartOverlay;

    // Enlazar eventos de apertura y cierre
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', openCart);
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Enlazar checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega productos para realizar una compra.');
                return;
            }
            
            // Simular checkout exitoso
            alert('🎉 ¡Muchas gracias por tu compra! Tu pedido simulado ha sido procesado con éxito.');
            clearCart();
            closeCart();
        });
    }

    // Sincronizar el estado inicial
    loadCart();
}
