# 🎓 Catálogo de E-commerce Interactivo - Propuesta Educativa

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![FakeStoreAPI](https://img.shields.io/badge/FakeStoreAPI-API-blueviolet?style=for-the-badge)](https://fakestoreapi.com/)

Este proyecto es una aplicación web interactiva diseñada exclusivamente con fines **pedagógicos y educativos**. Representa una excelente herramienta práctica para que los estudiantes aprendan a estructurar código de calidad profesional, transicionando desde un desarrollo monolítico en un solo archivo hacia una **arquitectura modular de alta calidad y testeada**, todo mediante tecnologías nativas del navegador.

---

## 🎯 Objetivos de Aprendizaje

A través de la exploración, análisis y extensión de esta base de código, los estudiantes dominarán los siguientes conceptos técnicos:

*   **🌐 Consumo de APIs REST**: Consumo asíncrono y estructurado de endpoints públicos (`FakeStoreAPI`) usando `fetch`, `async/await` y control de manejo de errores HTTP.
*   **🧩 ES Modules Nativos (Modularización)**: Estructuración de código sin necesidad de empaquetadores (Vite/Webpack) mediante la modularización nativa en el navegador usando `<script type="module">` e `import/export`.
*   **⚡ Manipulación del DOM Desacoplada**: Creación dinámica de elementos del DOM (grilla de productos y pestañas de filtrado) utilizando callbacks para delegar responsabilidades sin generar acoplamiento.
*   **🎤 Integración de Web APIs Avanzadas**: Implementación del reconocimiento de voz nativo en el navegador (`SpeechRecognition` API) junto con un sistema de traducción local (español a inglés) para filtrar el catálogo.
*   **🧪 Pruebas Unitarias con Vitest**: Introducción al testing unitario de lógica pura (traducción de búsquedas) y el uso de simulación (*mocking*) de peticiones de red (`fetch` global) con Vitest.

---

## 📁 Estructura del Proyecto

El código está organizado de manera que cada archivo cumpla una única responsabilidad (Principio de Responsabilidad Única):

```text
ecommerce-fakeapi/
├── index.html          # Estructura semántica del catálogo y el modal
├── style.css           # Estilos generales, layout responsivo y micro-animaciones
├── package.json        # Configuración del proyecto npm y scripts de pruebas
├── js/
│   ├── app.js          # Orquestador: Inicia la app y coordina los eventos globales
│   ├── api.js          # Cliente HTTP: Agrupa y exporta las llamadas a FakeStoreAPI
│   ├── gallery.js      # Vista Galería: Dibuja las tarjetas de productos y botones de categoría
│   ├── modal.js        # Vista Detalles: Controla el despliegue del modal de un producto
│   └── voiceSearch.js  # Feature de voz: Controla SpeechRecognition y la traducción
└── tests/
    └── unit/
        ├── api.test.js    # Pruebas unitarias de las peticiones HTTP y manejo de errores
        └── search.test.js # Pruebas unitarias de la lógica del mapa de traducción de voz
```

---

## 🛠️ Instalación y Ejecución de Pruebas

Para explorar el proyecto localmente y correr la suite de pruebas unitarias:

### 1. Clonar el repositorio
```bash
git clone https://github.com/sergiogimenezclass/ecommerce-con-FakeApi.git
cd ecommerce-con-FakeApi
```

### 2. Instalar dependencias de desarrollo
```bash
npm install
```

### 3. Ejecutar las pruebas unitarias con Vitest
Ejecutar las pruebas en modo de una sola pasada:
```bash
npm run test
```

Ejecutar las pruebas en modo interactivo (watch mode) ideal para TDD:
```bash
npm run test:watch
```

---

## 🚀 Desafíos Sugeridos para Estudiantes

Para consolidar los conocimientos adquiridos, se propone a los alumnos realizar las siguientes extensiones en el código:

### 1. 🛒 Implementación de Carrito de Compras (Dificultad: Media)
*   **Objetivo**: Añadir botones de "Agregar al carrito" en las tarjetas del catálogo.
*   **Implicancia**: Crear un módulo `js/cart.js` para gestionar el estado del carrito, guardarlo en el almacenamiento local (`localStorage`) e implementar un modal o barra lateral para ver los artículos seleccionados.

### 2. ↕️ Sistema de Ordenamiento de Productos (Dificultad: Fácil)
*   **Objetivo**: Permitir al usuario organizar los artículos según criterios de precio o popularidad.
*   **Implicancia**: Añadir un selector `<select>` en el HTML y escribir una función ordenadora en la lógica que actualice la galería dinámicamente al cambiar el criterio (por ejemplo, "Precio: de menor a mayor" o "Mejor valorados").

### 3. 🔐 Módulo de Autenticación de Usuario (Dificultad: Alta)
*   **Objetivo**: Integrar la simulación de inicio de sesión de usuario.
*   **Implicancia**: Utilizar el endpoint de autenticación `/auth/login` provisto por FakeStoreAPI para capturar credenciales mediante un formulario, almacenar el token resultante y modularizarlo dentro de una nueva sección del catálogo.
