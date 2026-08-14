import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setTheme, getPreferredTheme, initTheme, THEME_KEY } from '../../js/theme.js';

let localStorageStore = {};
let attributes = {};

global.localStorage = {
    getItem: vi.fn((key) => localStorageStore[key] || null),
    setItem: vi.fn((key, value) => {
        localStorageStore[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
        delete localStorageStore[key];
    }),
    clear: vi.fn(() => {
        localStorageStore = {};
    })
};

global.document = {
    documentElement: {
        setAttribute: vi.fn((key, val) => { attributes[key] = val; }),
        removeAttribute: vi.fn((key) => { delete attributes[key]; }),
        getAttribute: vi.fn((key) => attributes[key] || null)
    }
};

global.window = {
    matchMedia: vi.fn(() => ({ matches: false }))
};

describe('Pruebas unitarias del módulo de Tema (theme.js)', () => {
    beforeEach(() => {
        localStorageStore = {};
        attributes = {};
        vi.restoreAllMocks();
    });

    it('setTheme en modo "light" debe establecer data-theme="light" e ícono ☀️', () => {
        const btn = { textContent: '', setAttribute: vi.fn() };
        setTheme('light', btn);

        expect(global.document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
        expect(btn.textContent).toBe('☀️');
        expect(global.localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, 'light');
    });

    it('setTheme en modo "dark" debe remover data-theme e ícono 🌙', () => {
        attributes['data-theme'] = 'light';
        const btn = { textContent: '', setAttribute: vi.fn() };
        setTheme('dark', btn);

        expect(global.document.documentElement.removeAttribute).toHaveBeenCalledWith('data-theme');
        expect(btn.textContent).toBe('🌙');
        expect(global.localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, 'dark');
    });

    it('getPreferredTheme debe retornar el tema guardado en localStorage si existe', () => {
        localStorageStore[THEME_KEY] = 'light';
        expect(getPreferredTheme()).toBe('light');
    });

    it('initTheme debe alternar el tema al hacer clic en el botón', () => {
        let clickListener = null;
        const btn = {
            textContent: '',
            setAttribute: vi.fn(),
            addEventListener: vi.fn((event, handler) => {
                if (event === 'click') clickListener = handler;
            })
        };

        initTheme(btn);

        // Tema inicial 'dark' por defecto
        expect(btn.textContent).toBe('🌙');

        // Simular primer clic -> cambia a 'light'
        clickListener();
        expect(attributes['data-theme']).toBe('light');
        expect(btn.textContent).toBe('☀️');

        // Simular segundo clic -> vuelve a 'dark'
        clickListener();
        expect(attributes['data-theme']).toBeUndefined();
        expect(btn.textContent).toBe('🌙');
    });
});
