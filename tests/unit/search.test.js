import { describe, it, expect } from 'vitest';
import { translateTerm, translateMap } from '../../js/voiceSearch.js';

describe('Pruebas unitarias de Traducción para Búsqueda por Voz', () => {
    it('debería retornar un string vacío si la entrada es nula o vacía', () => {
        expect(translateTerm('')).toBe('');
        expect(translateTerm(null)).toBe('');
        expect(translateTerm(undefined)).toBe('');
    });

    it('debería traducir palabras clave que estén en el mapa de traducción', () => {
        expect(translateTerm('mochila')).toBe('backpack');
        expect(translateTerm('ropa')).toBe('clothing');
        expect(translateTerm('joyas')).toBe('jewel');
        expect(translateTerm('anillo')).toBe('ring');
    });

    it('debería mantener la palabra original si no está en el mapa de traducción', () => {
        expect(translateTerm('computadora')).toBe('computadora');
        expect(translateTerm('zapatos')).toBe('zapatos');
    });

    it('debería traducir múltiples palabras combinadas manteniendo las no traducibles', () => {
        // "ropa de hombre" -> "ropa" es clothing, "hombre" es men, "de" es de.
        // entonces -> "clothing de men"
        expect(translateTerm('ropa de hombre')).toBe('clothing de men');
        expect(translateTerm('anillo de oro')).toBe('ring de gold');
    });

    it('debería ser insensible a mayúsculas y espacios innecesarios', () => {
        expect(translateTerm('  MOCHILA   ')).toBe('backpack');
        expect(translateTerm('Anillo De Plata')).toBe('ring de silver');
    });
});
