export function renderGallery(products, galleryContainer, statusMessage, onCardClick) {
    if (!products || products.length === 0) {
        statusMessage.textContent = 'No se encontraron productos disponibles.';
        galleryContainer.innerHTML = '';
        statusMessage.style.display = 'block';
        galleryContainer.style.display = 'none';
        return;
    }

    // Limpiar el contenedor antes de inyectar
    galleryContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h2 class="product-title">${product.title}</h2>
                <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
        `;

        // Asignar evento para abrir el modal
        card.addEventListener('click', () => onCardClick(product.id));

        galleryContainer.appendChild(card);
    });

    // Alternar visibilidad de los estados
    statusMessage.style.display = 'none';
    galleryContainer.style.display = 'grid';
}

export function renderCategories(categories, allProducts, categoryFilters, onFilterChange) {
    categoryFilters.innerHTML = '';

    // Botón para restaurar todos los productos
    const allBtn = document.createElement('button');
    allBtn.textContent = 'todos';
    allBtn.className = 'category-btn active';
    allBtn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        allBtn.classList.add('active');
        onFilterChange(allProducts);
    });
    categoryFilters.appendChild(allBtn);

    // Botones dinámicos para las categorías
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.textContent = category;
        btn.className = 'category-btn';
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtered = allProducts.filter(product => product.category === category);
            onFilterChange(filtered);
        });
        categoryFilters.appendChild(btn);
    });
}
