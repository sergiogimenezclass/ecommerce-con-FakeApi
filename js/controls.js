export function getControlParams(elements) {
    const { sortSelect, limitSelect } = elements;
    
    const sortVal = sortSelect ? sortSelect.value : 'default';
    const limitVal = limitSelect ? limitSelect.value : 'all';
    
    return {
        sort: sortVal,
        limit: limitVal === 'all' ? null : Number(limitVal)
    };
}

export function sortProducts(products, sortType) {
    if (!Array.isArray(products)) return [];
    const copy = [...products];

    switch (sortType) {
        case 'price-asc':
            return copy.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        case 'price-desc':
            return copy.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        case 'name-asc':
            return copy.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        case 'name-desc':
            return copy.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        default:
            return copy;
    }
}

export function paginateProducts(products, page = 1, limit = null) {
    if (!Array.isArray(products)) return [];
    if (!limit || isNaN(limit) || Number(limit) <= 0) {
        return products;
    }
    
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Number(limit);
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
}

export function initControls(elements, onChangeCallback) {
    const { sortSelect, limitSelect } = elements;

    const handleControlChange = () => {
        if (typeof onChangeCallback === 'function') {
            const params = getControlParams(elements);
            onChangeCallback(params);
        }
    };

    if (sortSelect) {
        sortSelect.addEventListener('change', handleControlChange);
    }
    if (limitSelect) {
        limitSelect.addEventListener('change', handleControlChange);
    }
}
