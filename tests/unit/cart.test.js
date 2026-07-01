import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cart, addToCart, updateQuantity, removeFromCart, clearCart, loadCart } from '../../js/cart.js';

// Mock de localStorage en memoria
let localStorageStore = {};
global.localStorage = {
    getItem: vi.fn((key) => localStorageStore[key] || null),
    setItem: vi.fn((key, value) => {
        localStorageStore[key] = value.toString();
    }),
    clear: vi.fn(() => {
        localStorageStore = {};
    })
};

describe('Pruebas unitarias de la Lógica del Carrito (cart.js)', () => {
    beforeEach(() => {
        localStorageStore = {};
        vi.restoreAllMocks();
        // Vaciar el carrito antes de cada prueba (puesto que se exporta el estado mutado)
        clearCart();
    });

    it('debería inicializarse vacío', () => {
        expect(cart).toEqual([]);
    });

    it('addToCart debería agregar un producto nuevo con cantidad 1', () => {
        const product = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        addToCart(product);

        expect(cart.length).toBe(1);
        expect(cart[0]).toEqual({
            id: 1,
            title: 'Mochila',
            price: 29.99,
            image: 'img.jpg',
            category: undefined,
            quantity: 1
        });
        expect(global.localStorage.setItem).toHaveBeenCalled();
    });

    it('addToCart debería incrementar la cantidad si el producto ya existe', () => {
        const product = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        addToCart(product);
        addToCart(product);

        expect(cart.length).toBe(1);
        expect(cart[0].quantity).toBe(2);
    });

    it('updateQuantity debería modificar la cantidad e incrementar/decrementar correctamente', () => {
        const product = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        addToCart(product); // Qty = 1
        
        updateQuantity(1, 2); // Qty = 3
        expect(cart[0].quantity).toBe(3);

        updateQuantity(1, -1); // Qty = 2
        expect(cart[0].quantity).toBe(2);
    });

    it('updateQuantity debería eliminar el ítem si la cantidad resultante es 0 o menor', () => {
        const product = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        addToCart(product);

        updateQuantity(1, -1); // Qty = 0 -> Elimina del carrito
        expect(cart).toEqual([]);
    });

    it('removeFromCart debería eliminar un ítem del carrito directamente', () => {
        const p1 = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        const p2 = { id: 2, title: 'Zapatos', price: 49.99, image: 'img2.jpg' };
        addToCart(p1);
        addToCart(p2);

        removeFromCart(1);
        expect(cart.length).toBe(1);
        expect(cart[0].id).toBe(2);
    });

    it('clearCart debería vaciar completamente el carrito', () => {
        const p = { id: 1, title: 'Mochila', price: 29.99, image: 'img.jpg' };
        addToCart(p);
        addToCart(p);

        clearCart();
        expect(cart).toEqual([]);
    });

    it('loadCart debería rellenar el carrito desde localStorage si existen datos previos', () => {
        const storedItems = [
            { id: 3, title: 'Joya', price: 99.99, image: 'joya.jpg', quantity: 2 }
        ];
        localStorageStore['cart'] = JSON.stringify(storedItems);

        loadCart();
        expect(cart.length).toBe(1);
        expect(cart[0].title).toBe('Joya');
        expect(cart[0].quantity).toBe(2);
    });
});
