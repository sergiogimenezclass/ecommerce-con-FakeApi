export function getURLParams() {
    if (typeof window === 'undefined' || !window.location) {
        return { category: 'all', sort: 'default', limit: 'all', page: 1 };
    }

    const searchParams = new URLSearchParams(window.location.search);

    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'default';
    const limitRaw = searchParams.get('limit');
    const pageRaw = searchParams.get('page');

    const limit = limitRaw && limitRaw !== 'all' && !isNaN(limitRaw) ? Number(limitRaw) : 'all';
    const page = pageRaw && !isNaN(pageRaw) && Number(pageRaw) > 0 ? Number(pageRaw) : 1;

    return { category, sort, limit, page };
}

export function updateURLParams(state = {}) {
    if (typeof window === 'undefined' || !window.history) return;

    const { category = 'all', sort = 'default', limit = 'all', page = 1 } = state;
    const searchParams = new URLSearchParams();

    if (category && category !== 'all') {
        searchParams.set('category', category);
    }
    if (sort && sort !== 'default') {
        searchParams.set('sort', sort);
    }
    if (limit && limit !== 'all') {
        searchParams.set('limit', String(limit));
    }
    if (page && Number(page) > 1) {
        searchParams.set('page', String(page));
    }

    const queryString = searchParams.toString();
    const newRelativePathQuery = window.location.pathname + (queryString ? `?${queryString}` : '');
    
    // Solo actualizar si la URL realmente cambia para evitar duplicar estados idénticos en el historial
    if (window.location.search !== (queryString ? `?${queryString}` : '')) {
        window.history.pushState(state, '', newRelativePathQuery);
    }
}

export function syncUIWithURLParams(params, elements) {
    const { sortSelect, limitSelect } = elements;

    if (sortSelect && params.sort) {
        sortSelect.value = params.sort;
    }
    if (limitSelect && params.limit) {
        limitSelect.value = String(params.limit);
    }
}
