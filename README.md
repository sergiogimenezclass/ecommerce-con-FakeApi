# 🎓 Catálogo de E-commerce Interactivo - Propuesta Educativa

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![FakeStoreAPI](https://img.shields.io/badge/FakeStoreAPI-API-blueviolet?style=for-the-badge)](https://fakestoreapi.com/)

Este proyecto es una aplicación web interactiva diseñada exclusivamente con fines **pedagógicos y educativos**. Representa una excelente herramienta práctica para que los estudiantes aprendan a estructurar código de calidad profesional, transicionando desde un desarrollo monolítico en un solo archivo hacia una **arquitectura modular de alta calidad, desacoplada y testeada al 100%**, todo mediante tecnologías nativas del navegador.

---

## 🎯 Objetivos de Aprendizaje

A través de la exploración, análisis y extensión de esta base de código, los estudiantes dominarán los siguientes conceptos técnicos:

*   **🌐 Consumo de APIs REST**: Consumo asíncrono y estructurado de endpoints públicos (`FakeStoreAPI`) usando `fetch`, `async/await` y control de manejo de errores HTTP.
*   **🧩 ES Modules Nativos (Modularización)**: Estructuración de código desacoplado mediante ES Modules (`<script type="module">` e `import/export`) aplicando el **Principio de Responsabilidad Única (SRP)**.
*   **🎨 Diseño UI Avanzado (Glassmorphism & Modos de Tema)**: Creación de sistemas de diseño modernos con Vanilla CSS, variables CSS dinámicas, desenfoque de fondo (`backdrop-filter`) y alternancia de **Modo Día / Modo Noche** persistente en `localStorage`.
*   **🛒 Estado del Carrito & Seguridad de Tipos**: Gestión de estado global en cliente para el carrito de compras, manipulación defensiva de tipos (`Number(productId)`), persistencia local y sincronización del badge contador.
*   **👤 Perfil de Usuario Integrado**: Consumo y renderizado defensivo del endpoint `/users/1` con desplegables Glassmorphism y tolerancia a fallos.
*   **↕️ Ordenamiento Avanzado y Paginación en Cliente**: Algoritmos de ordenamiento local por **Precio (Menor/Mayor)** y **Nombre (A-Z/Z-A)** combinados con rebanado dinámico (*slice*) y renderizado de una botonera de paginación interactiva.
*   **🔗 Sincronización de URL (URLSearchParams & History API)**: Estado bidireccional reflejado en la barra de navegación (`window.location.search`) mediante `URLSearchParams` e `history.pushState()`, permitiendo enlaces compartibles (ej. `?category=jewelery&sort=price-asc&limit=6&page=2`) y soporte nativo para los botones **Atrás / Adelante** (`popstate`).
*   **🎤 Web APIs Avanzadas**: Integración del reconocimiento de voz nativo (`SpeechRecognition` API) con mapa de traducción local (español a inglés) para filtrado por voz.
*   **🧪 Testing Unitario con Vitest**: Cobertura de pruebas unitarias (38 pruebas activas) probando funciones puras, manipulaciones del DOM simuladas (*mocking*) y peticiones de red asíncronas.

---

## 📁 Estructura del Proyecto

El código está organizado de manera que cada archivo cumpla una única responsabilidad:

```text
ecommerce-fakeapi/
├── index.html              # Estructura semántica, header, controles, grilla, sidebar del carrito y modal
├── style.css               # Estilos Glassmorphism, temas dinámicos (Día/Noche), layout responsivo y animaciones
├── package.json            # Configuración del proyecto npm y scripts de ejecución de Vitest
├── js/
│   ├── app.js              # Orquestador: Inicia la app, coordina eventos globales y la sincronización con la URL
│   ├── api.js              # Cliente HTTP: Agrupa y exporta las llamadas a FakeStoreAPI (productos, categorías, usuario)
│   ├── gallery.js          # Vista Galería: Dibuja tarjetas de productos y botones de categorías
│   ├── cart.js             # Módulo Carrito: Controla la adición, eliminación, cantidades y badge
│   ├── controls.js         # Módulo Controles: Funciones puras de ordenamiento por precio/nombre y paginación
│   ├── pagination.js       # Módulo Paginación: Renderiza la botonera interactiva [‹ Anterior] [1] [2] [Siguiente ›]
│   ├── urlParams.js        # Módulo URL: Maneja URLSearchParams e history.pushState() para mantener la URL actualizada
│   ├── profile.js          # Módulo Perfil: Gestiona el menú desplegable e información del usuario
│   ├── theme.js            # Módulo Tema: Alternancia de Modo Día / Modo Noche con persistencia
│   ├── modal.js            # Vista Detalles: Controla el despliegue del modal del producto
│   └── voiceSearch.js      # Feature de voz: Controla SpeechRecognition y la traducción de búsqueda
└── tests/
    └── unit/
        ├── api.test.js        # Pruebas de cliente HTTP y manejo de errores
        ├── cart.test.js       # Pruebas de lógica de carrito, parseo de tipos e incremento/decrecimiento
        ├── controls.test.js   # Pruebas de extracción de parámetros y listeners de ordenamiento
        ├── pagination.test.js # Pruebas de ordenamiento por precio/nombre y rebanado de páginas
        ├── profile.test.js    # Pruebas de renderizado de datos del usuario
        ├── search.test.js     # Pruebas de la lógica del mapa de traducción de voz
        ├── theme.test.js      # Pruebas de alternancia de temas y lectura de localStorage
        └── urlParams.test.js  # Pruebas de construcción y lectura de Query Parameters en la URL
```

---

## 🛠️ Instalación y Ejecución de Pruebas

Para explorar el proyecto localmente y correr la suite completa de 38 pruebas unitarias:

### 1. Clonar el repositorio
```bash
git clone https://github.com/sergiogimenezclass/ecommerce-con-FakeApi.git
cd ecommerce-con-FakeApi
```

### 2. Instalar dependencias de desarrollo
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo local
```bash
npm run dev
```
Abrir la URL generada en el navegador: `http://localhost:5173/`.

### 4. Ejecutar las pruebas unitarias con Vitest
Ejecutar la suite completa de pruebas:
```bash
npm run test
```

Ejecutar las pruebas en modo interactivo (*watch mode*) ideal para desarrollo basado en pruebas (TDD):
```bash
npm run test:watch
```

---

## 🚀 Desafíos Sugeridos para Estudiantes

Para continuar consolidando y extendiendo los conocimientos adquiridos, se propone a los alumnos realizar las siguientes actividades:

### 1. 💳 Proceso de Checkout / Confirmación de Pedido (Dificultad: Media)
*   **Objetivo**: Implementar el envío del pedido al backend mediante `POST /carts`.
*   **Implicancia**: Al presionar "Finalizar Compra" en la barra lateral del carrito, enviar el JSON con el ID de usuario y la lista de artículos, recibiendo la respuesta de la API para mostrar un modal de **Ticket de Confirmación de Compra**.

### 2. 📜 Historial de Compras Pasadas (Dificultad: Media)
*   **Objetivo**: Consultar los pedidos históricos del usuario en la API.
*   **Implicancia**: Consumir el endpoint `GET /carts/user/1` e inyectar una sección *"Mis Compras"* dentro del menú desplegable del perfil de usuario.

### 3. 🔐 Autenticación Real con Token JWT (Dificultad: Alta)
*   **Objetivo**: Simular el login de usuario con Token de sesión.
*   **Implicancia**: Capturar las credenciales mediante un formulario modal, enviarlas a `POST /auth/login`, almacenar el Token JWT devuelto en `sessionStorage` y restringir ciertas vistas únicamente a usuarios autenticados.
