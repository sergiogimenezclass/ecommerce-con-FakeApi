export function initProfile(elements) {
    const { profileBtn, profileDropdown } = elements;

    if (!profileBtn || !profileDropdown) return;

    // Abrir/cerrar dropdown al hacer clic en el botón de perfil
    profileBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        profileDropdown.classList.toggle('open');
    });

    // Cerrar dropdown si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!profileDropdown.contains(event.target) && event.target !== profileBtn) {
            profileDropdown.classList.remove('open');
        }
    });
}

export function renderProfile(user, elements) {
    const {
        profileName,
        dropdownFullname,
        dropdownEmail,
        dropdownPhone,
        dropdownAddress
    } = elements;

    if (!user) return;

    // Formatear nombre completo
    const firstname = user.name?.firstname || '';
    const lastname = user.name?.lastname || '';
    const fullname = `${firstname} ${lastname}`.trim() || user.username;

    // Inyectar datos en la UI
    if (profileName) {
        profileName.textContent = firstname || user.username;
    }
    
    if (dropdownFullname) {
        dropdownFullname.textContent = fullname;
    }
    
    if (dropdownEmail) {
        dropdownEmail.textContent = user.email || '';
    }
    
    if (dropdownPhone) {
        dropdownPhone.textContent = user.phone || 'No especificado';
    }
    
    if (dropdownAddress && user.address) {
        const number = user.address.number || '';
        const street = user.address.street || '';
        const city = user.address.city || '';
        const zipcode = user.address.zipcode || '';
        
        dropdownAddress.textContent = `${number} ${street}, ${city} (${zipcode})`.trim();
    }
}
