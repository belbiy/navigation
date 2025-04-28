import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add process polyfill
declare global {
  interface Window {
    process?: {
      env: Record<string, any>;
      platform: string;
      version: string;
    };
  }
}

if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {},
    platform: 'browser',
    version: '',
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
