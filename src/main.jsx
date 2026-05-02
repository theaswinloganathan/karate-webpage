import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error handler for demo debugging
window.onerror = function(msg, url, line) {
  alert("Vite Error: " + msg + "\nLine: " + line);
  return false;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
