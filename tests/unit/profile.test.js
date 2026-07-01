import { describe, it, expect } from 'vitest';
import { renderProfile } from '../../js/profile.js';

describe('Pruebas unitarias de renderProfile (profile.js)', () => {
    it('debería mapear correctamente el nombre, email, teléfono y dirección del usuario al DOM', () => {
        // Mock de datos de usuario de la API
        const user = {
            username: 'johndoe',
            email: 'john@gmail.com',
            name: {
                firstname: 'john',
                lastname: 'doe'
            },
            phone: '1-570-236-7033',
            address: {
                number: 86,
                street: 'road',
                city: 'kilcoole',
                zipcode: '12345-6789'
            }
        };

        // Mock de elementos del DOM
        const elements = {
            profileName: { textContent: '' },
            dropdownFullname: { textContent: '' },
            dropdownEmail: { textContent: '' },
            dropdownPhone: { textContent: '' },
            dropdownAddress: { textContent: '' }
        };

        renderProfile(user, elements);

        expect(elements.profileName.textContent).toBe('john');
        expect(elements.dropdownFullname.textContent).toBe('john doe');
        expect(elements.dropdownEmail.textContent).toBe('john@gmail.com');
        expect(elements.dropdownPhone.textContent).toBe('1-570-236-7033');
        expect(elements.dropdownAddress.textContent).toBe('86 road, kilcoole (12345-6789)');
    });

    it('debería usar username si el nombre completo no existe', () => {
        const user = {
            username: 'johndoe',
            email: 'john@gmail.com',
            phone: '1-570-236-7033'
        };

        const elements = {
            profileName: { textContent: '' },
            dropdownFullname: { textContent: '' }
        };

        renderProfile(user, elements);

        expect(elements.profileName.textContent).toBe('johndoe');
        expect(elements.dropdownFullname.textContent).toBe('johndoe');
    });

    it('debería gestionar gracefully si los elementos del DOM no están provistos', () => {
        const user = {
            username: 'johndoe'
        };

        // No debería tirar error al pasar un objeto de elementos vacío
        expect(() => renderProfile(user, {})).not.toThrow();
    });
});
