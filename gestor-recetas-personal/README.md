```
src/
├── App.jsx                       // The main application component
├── components                    // Components
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
