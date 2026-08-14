import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getURLParams, updateURLParams, syncUIWithURLParams } from '../../js/urlParams.js';

describe('Pruebas unitarias del módulo urlParams.js (URLSearchParams & History API)', () => {
    beforeEach(() => {
        // Mock de window.location y window.history
        global.window = {
            location: {
                search: '?category=jewelery&sort=price-asc&limit=6&page=2',
                pathname: '/'
            },
            history: {
                pushState: vi.fn()
            }
        };
    });

    it('getURLParams debe extraer correctamente category, sort, limit y page desde la URL', () => {
        const params = getURLParams();

        expect(params).toEqual({
            category: 'jewelery',
            sort: 'price-asc',
            limit: 6,
            page: 2
        });
    });

    it('getURLParams debe entregar valores por defecto si no existen parámetros en la URL', () => {
        global.window.location.search = '';
        const params = getURLParams();

        expect(params).toEqual({
            category: 'all',
            sort: 'default',
            limit: 'all',
            page: 1
        });
    });

    it('updateURLParams debe invocar history.pushState con los Query Parameters correspondientes', () => {
        updateURLParams({
            category: 'electronics',
            sort: 'name-asc',
            limit: 12,
            page: 3
        });

        expect(global.window.history.pushState).toHaveBeenCalledWith(
            { category: 'electronics', sort: 'name-asc', limit: 12, page: 3 },
            '',
            '/?category=electronics&sort=name-asc&limit=12&page=3'
        );
    });

    it('syncUIWithURLParams debe actualizar el valor de los selectores HTML', () => {
        const elements = {
            sortSelect: { value: '' },
            limitSelect: { value: '' }
        };

        syncUIWithURLParams({ sort: 'price-desc', limit: 6 }, elements);

        expect(elements.sortSelect.value).toBe('price-desc');
        expect(elements.limitSelect.value).toBe('6');
    });
});
