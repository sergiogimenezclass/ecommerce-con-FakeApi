export const translateMap = {
    "mochila": "backpack",
    "mochilas": "backpack",
    "ropa": "clothing",
    "hombre": "men",
    "hombres": "men",
    "mujer": "women",
    "mujeres": "women",
    "joya": "jewel",
    "joyas": "jewel",
    "anillo": "ring",
    "oro": "gold",
    "plata": "silver",
    "electrónica": "electronic",
    "electronica": "electronic",
    "monitor": "monitor",
    "televisor": "tv",
    "disco": "drive"
};

export function translateTerm(transcript) {
    if (!transcript) return '';
    const normalized = transcript.toLowerCase().trim();
    return normalized.split(/\s+/).map(word => translateMap[word] || word).join(' ');
}

export function initVoiceSearch(micBtn, searchStatus, getAllProducts, onFilteredResult) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = false;
        recognition.interimResults = false;

        micBtn.addEventListener('click', (event) => {
            event.preventDefault();
            recognition.start();
        });

        recognition.onstart = () => {
            micBtn.classList.add('listening');
            micBtn.classList.remove('error');
            searchStatus.textContent = 'Escuchando...';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const translatedTerm = translateTerm(transcript);
            searchStatus.textContent = `Buscando: "${transcript}"`;
            
            const allProducts = getAllProducts();
            const filteredProducts = allProducts.filter(product => 
                product.title.toLowerCase().includes(translatedTerm) || 
                product.category.toLowerCase().includes(translatedTerm)
            );

            onFilteredResult(filteredProducts);
        };

        recognition.onerror = (event) => {
            console.error('Error de voz:', event.error);
            micBtn.classList.remove('listening');
            micBtn.classList.add('error');
            searchStatus.textContent = 'Error al procesar voz.';
            
            setTimeout(() => {
                micBtn.classList.remove('error');
                if (searchStatus.textContent === 'Error al procesar voz.') {
                    searchStatus.textContent = '';
                }
            }, 3000);
        };

        recognition.onend = () => {
            micBtn.classList.remove('listening');
        };

    } else {
        micBtn.style.display = 'none';
        searchStatus.textContent = 'La búsqueda por voz no es compatible con este navegador.';
    }
}
