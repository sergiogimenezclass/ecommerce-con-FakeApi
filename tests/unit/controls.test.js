import { describe, it, expect, vi } from 'vitest';
import { getControlParams, initControls } from '../../js/controls.js';

describe('Pruebas unitarias del módulo de Controles de Ordenamiento y Límite (controls.js)', () => {
    it('getControlParams debe extraer los valores correctos de sort y limit', () => {
        const elements = {
            sortSelect: { value: 'desc' },
            limitSelect: { value: '6' }
        };

        const params = getControlParams(elements);

        expect(params).toEqual({
            sort: 'desc',
            limit: 6
        });
    });

    it('getControlParams debe retornar valores por defecto ("asc" y null) si limit es "all"', () => {
        const elements = {
            sortSelect: { value: 'asc' },
            limitSelect: { value: 'all' }
        };

        const params = getControlParams(elements);

        expect(params).toEqual({
            sort: 'asc',
            limit: null
        });
    });

    it('initControls debe ejecutar el callback al cambiar la selección de sort o limit', () => {
        let sortChangeHandler = null;
        let limitChangeHandler = null;

        const elements = {
            sortSelect: {
                value: 'desc',
                addEventListener: vi.fn((event, handler) => {
                    if (event === 'change') sortChangeHandler = handler;
                })
            },
            limitSelect: {
                value: '12',
                addEventListener: vi.fn((event, handler) => {
                    if (event === 'change') limitChangeHandler = handler;
                })
            }
        };

        const callbackSpy = vi.fn();
        initControls(elements, callbackSpy);

        // Simular cambio en sortSelect
        expect(sortChangeHandler).toBeTypeOf('function');
        sortChangeHandler();
        expect(callbackSpy).toHaveBeenCalledWith({ sort: 'desc', limit: 12 });

        // Simular cambio en limitSelect
        expect(limitChangeHandler).toBeTypeOf('function');
        elements.sortSelect.value = 'asc';
        limitChangeHandler();
        expect(callbackSpy).toHaveBeenCalledWith({ sort: 'asc', limit: 12 });
    });
});
