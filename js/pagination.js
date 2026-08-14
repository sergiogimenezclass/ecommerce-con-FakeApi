export function renderPagination(totalItems, currentPage, limit, container, onPageChange) {
    if (!container) return;

    // Si no hay límite o los ítems entran en una sola página, ocultar la botonera
    if (!limit || isNaN(limit) || Number(limit) <= 0 || totalItems <= limit) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    const totalPages = Math.ceil(totalItems / limit);
    if (totalPages <= 1) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    container.style.display = 'flex';

    // Botón Anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = `page-btn nav-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '‹ Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1 && typeof onPageChange === 'function') {
            onPageChange(currentPage - 1);
        }
    });
    container.appendChild(prevBtn);

    // Botones de números de página
    for (let p = 1; p <= totalPages; p++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn num-btn ${p === currentPage ? 'active' : ''}`;
        pageBtn.textContent = p;
        pageBtn.addEventListener('click', () => {
            if (p !== currentPage && typeof onPageChange === 'function') {
                onPageChange(p);
            }
        });
        container.appendChild(pageBtn);
    }

    // Botón Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.className = `page-btn nav-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = 'Siguiente ›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages && typeof onPageChange === 'function') {
            onPageChange(currentPage + 1);
        }
    });
    container.appendChild(nextBtn);
}
