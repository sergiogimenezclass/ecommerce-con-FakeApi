import { describe, it, expect, vi } from 'vitest';
import { sortProducts, paginateProducts } from '../../js/controls.js';
import { renderPagination } from '../../js/pagination.js';

describe('Pruebas unitarias de Ordenamiento y Paginación en Cliente', () => {
    const products = [
        { id: 1, title: 'Zapatos', price: 50 },
        { id: 2, title: 'Abrigo', price: 100 },
        { id: 3, title: 'Camisa', price: 20 },
        { id: 4, title: 'Bufanda', price: 10 }
    ];

    it('sortProducts debe ordenar por precio ascendente (price-asc)', () => {
        const sorted = sortProducts(products, 'price-asc');
        expect(sorted.map(p => p.price)).toEqual([10, 20, 50, 100]);
    });

    it('sortProducts debe ordenar por precio descendente (price-desc)', () => {
        const sorted = sortProducts(products, 'price-desc');
        expect(sorted.map(p => p.price)).toEqual([100, 50, 20, 10]);
    });

    it('sortProducts debe ordenar por nombre de A a Z (name-asc)', () => {
        const sorted = sortProducts(products, 'name-asc');
        expect(sorted.map(p => p.title)).toEqual(['Abrigo', 'Bufanda', 'Camisa', 'Zapatos']);
    });

    it('sortProducts debe ordenar por nombre de Z a A (name-desc)', () => {
        const sorted = sortProducts(products, 'name-desc');
        expect(sorted.map(p => p.title)).toEqual(['Zapatos', 'Camisa', 'Bufanda', 'Abrigo']);
    });

    it('paginateProducts debe rebanar el array según la página y el límite', () => {
        const p1 = paginateProducts(products, 1, 2);
        expect(p1.length).toBe(2);
        expect(p1[0].id).toBe(1);

        const p2 = paginateProducts(products, 2, 2);
        expect(p2.length).toBe(2);
        expect(p2[0].id).toBe(3);
    });

    it('renderPagination debe inyectar la botonera e interactuar con el callback', () => {
        const container = {
            innerHTML: '',
            style: { display: 'none' },
            appendChild: vi.fn()
        };

        const callbackSpy = vi.fn();
        renderPagination(20, 1, 6, container, callbackSpy);

        // Se deben crear 4 páginas + 2 botones de navegación (Anterior/Siguiente) = 6 botones
        expect(container.style.display).toBe('flex');
        expect(container.appendChild).toHaveBeenCalledTimes(6);
    });
});
