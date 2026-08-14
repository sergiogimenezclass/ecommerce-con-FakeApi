import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setTheme, getPreferredTheme, initTheme, THEME_KEY } from '../../js/theme.js';

let localStorageStore = {};

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

describe('Pruebas unitarias del módulo de Tema (theme.js)', () => {
    beforeEach(() => {
        localStorageStore = {};
        document.documentElement.removeAttribute('data-theme');
        vi.restoreAllMocks();
    });

    it('setTheme en modo "light" debe establecer data-theme="light" e ícono ☀️', () => {
        const btn = document.createElement('button');
        setTheme('light', btn);

        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(btn.textContent).toBe('☀️');
        expect(global.localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, 'light');
    });

    it('setTheme en modo "dark" debe remover data-theme e ícono 🌙', () => {
        document.documentElement.setAttribute('data-theme', 'light');
        const btn = document.createElement('button');
        setTheme('dark', btn);

        expect(document.documentElement.getAttribute('data-theme')).toBeNull();
        expect(btn.textContent).toBe('🌙');
        expect(global.localStorage.setItem).toHaveBeenCalledWith(THEME_KEY, 'dark');
    });

    it('getPreferredTheme debe retornar el tema guardado en localStorage si existe', () => {
        localStorageStore[THEME_KEY] = 'light';
        expect(getPreferredTheme()).toBe('light');
    });

    it('initTheme debe alternar el tema al hacer clic en el botón', () => {
        const btn = document.createElement('button');
        initTheme(btn);

        // Tema inicial 'dark' por defecto
        expect(btn.textContent).toBe('🌙');

        // Primer clic -> cambia a 'light'
        btn.click();
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        expect(btn.textContent).toBe('☀️');

        // Segundo clic -> vuelve a 'dark'
        btn.click();
        expect(document.documentElement.getAttribute('data-theme')).toBeNull();
        expect(btn.textContent).toBe('🌙');
    });
});
