export function getControlParams(elements) {
    const { sortSelect, limitSelect } = elements;
    
    const sortVal = sortSelect ? sortSelect.value : 'asc';
    const limitVal = limitSelect ? limitSelect.value : 'all';
    
    return {
        sort: sortVal === 'desc' ? 'desc' : 'asc',
        limit: limitVal === 'all' ? null : Number(limitVal)
    };
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
