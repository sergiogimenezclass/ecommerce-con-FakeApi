import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProducts, fetchCategories, fetchProductDetail } from '../../js/api.js';

describe('Pruebas unitarias del Cliente API (api.js)', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('fetchProducts debería devolver un listado de productos exitosamente', async () => {
        const mockProducts = [
            { id: 1, title: 'Product A', category: 'clothing' },
            { id: 2, title: 'Product B', category: 'electronics' }
        ];
        
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockProducts
        });

        const products = await fetchProducts();
        expect(products).toEqual(mockProducts);
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });

    it('fetchProducts debería lanzar un error si response.ok es false', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500
        });

        await expect(fetchProducts()).rejects.toThrow('Error HTTP: 500');
    });

    it('fetchCategories debería devolver categorías exitosamente', async () => {
        const mockCategories = ['electronics', 'jewelery'];

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockCategories
        });

        const categories = await fetchCategories();
        expect(categories).toEqual(mockCategories);
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories');
    });

    it('fetchProductDetail debería devolver el detalle del producto', async () => {
        const mockProduct = { id: 5, title: 'Product 5', price: 10.99 };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockProduct
        });

        const product = await fetchProductDetail(5);
        expect(product).toEqual(mockProduct);
        expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/5');
    });
});
