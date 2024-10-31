```
src/
├── App.jsx                       // The main application component
├── components                    // Components
│   ├── Header                    // A component that displays a header with multiple fast actions
│   │   └── Header.jsx
│   ├── Loader                    // A component that displays a loader while the app is loading
│   │   └── Loader.jsx
│   └── PrivateRoute              // A component that wraps a route with authentication
│       └── PrivateRoute.jsx
├── config                        // Configuration
│   └── firebaseConfig.js         // Firebase configuration
├── context                       // Context
│   ├── AuthContext.jsx           // Authentication context
│   └── ProductsCacheContext.jsx  // Products cache context
├── icons                         // Icons
│   └── Cookie.jsx                // A cookie icon
├── main.jsx                      // The main entry point for the application
├── pages                         // Pages
│   ├── Dashboard.jsx             // The dashboard page
│   ├── Home.jsx                  // The home page
│   ├── Login.jsx                 // The login page
│   └── Register.jsx              // The register page
└── utils                         // Utilities
    ├── auth.js                   // Authentication utility functions
    └── store.js                  // Store utility functions
```

---

**Mis modificaciones:**

- **Agregadó de un Header y Selector de Modo Oscuro:** [Chat](https://chatgpt.com/share/6723bdca-56cc-8007-9e58-b8b92e17c1b3)
    
    Aclaracón: No estan todas las modificaciones completas el este chat, porque tuve problemas para que ChatGPT (y otras
    IA también) para que me identifique el Bulma tiene temas. Supongo que o fue agregado posterior al cierre de
    conocimiento de las IAs.

- **Se movió el Login/Logout al Header:** [Chat](https://chatgpt.com/share/6723bdca-56cc-8007-9e58-b8b92e17c1b3)

    Aclaración: es el mismo chat que el selector de Modo Oscuro, esta mas abajo la parte del Login/Logout. También hay
    algunas modificaciones que hice yo a mano, como eliminar el botón de login/logout de las pantallas de Home.jsx y
    Dashboard.jsx.

- **Se agrega un buscador de recetas en el Home.jsx:** [Chat](https://chatgpt.com/share/6723c3e7-46d8-8007-9023-51376f0fcc61)

- **:** [Chat]()