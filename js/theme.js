export const THEME_KEY = 'ecommerce_theme';

export function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function setTheme(theme, toggleBtn) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (toggleBtn) {
            toggleBtn.textContent = '☀️';
            toggleBtn.setAttribute('title', 'Cambiar a Modo Noche');
            toggleBtn.setAttribute('aria-label', 'Cambiar a Modo Noche');
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleBtn) {
            toggleBtn.textContent = '🌙';
            toggleBtn.setAttribute('title', 'Cambiar a Modo Día');
            toggleBtn.setAttribute('aria-label', 'Cambiar a Modo Día');
        }
    }
    localStorage.setItem(THEME_KEY, theme);
}

export function initTheme(toggleBtn) {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme, toggleBtn);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = activeTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme, toggleBtn);
        });
    }
}
