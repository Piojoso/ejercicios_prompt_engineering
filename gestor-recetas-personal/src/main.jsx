import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import 'bulma/css/bulma.min.css';
import './i18n'; // Asegúrate de que se ejecute en la carga inicial

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
