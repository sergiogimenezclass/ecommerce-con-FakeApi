import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCartOrder } from '../../js/api.js';
import { renderCheckoutTicket } from '../../js/checkoutModal.js';

describe('Pruebas unitarias del flujo de Checkout Real (POST /carts & Ticket Modal)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        global.fetch = vi.fn();
    });

    it('createCartOrder debe lanzar un error si el carrito está vacío', async () => {
        await expect(createCartOrder([])).rejects.toThrow('El carrito no puede estar vacío');
    });

    it('createCartOrder debe formatear el payload y enviar una petición POST a /carts', async () => {
        const mockOrderResponse = {
            id: 11,
            userId: 1,
            date: '2026-08-21',
            products: [{ productId: 1, quantity: 2 }]
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockOrderResponse
        });

        const cartItems = [
            { id: '1', title: 'Producto Test', price: 50, quantity: 2 }
        ];

        const result = await createCartOrder(cartItems, 1);

        expect(global.fetch).toHaveBeenCalledWith(
            'https://fakestoreapi.com/carts',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: expect.stringContaining('"productId":1')
            })
        );
        expect(result).toEqual(mockOrderResponse);
    });

    it('renderCheckoutTicket debe inyectar el HTML del recibo y desplegar el modal', () => {
        const modalOverlay = { style: { display: 'none' } };
        const modalBody = { innerHTML: '' };

        const orderData = { id: 11, date: '2026-08-21' };
        const cartItems = [
            { id: 1, title: 'Camisa Neón', price: 30, quantity: 2, image: 'img.jpg' }
        ];

        // Mock document.getElementById para el botón continuar comprando
        global.document = {
            getElementById: vi.fn().mockReturnValue({
                addEventListener: vi.fn()
            })
        };

        renderCheckoutTicket(orderData, cartItems, 60, modalOverlay, modalBody);

        expect(modalOverlay.style.display).toBe('flex');
        expect(modalBody.innerHTML).toContain('#ORD-11');
        expect(modalBody.innerHTML).toContain('Camisa Neón');
        expect(modalBody.innerHTML).toContain('$60.00');
    });
});
