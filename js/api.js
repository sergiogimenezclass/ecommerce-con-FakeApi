const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fallo en la obtención de productos:', error);
        throw error;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) {
            throw new Error(`Error HTTP Categorías: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fallo en la obtención de categorías:', error);
        throw error;
    }
}

export async function fetchProductDetail(productId) {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error(`Error HTTP Detalle: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fallo en la obtención de detalle del producto:', error);
        throw error;
    }
}
