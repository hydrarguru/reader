import './index.css';
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <Suspense fallback={<div>Loading...</div>}>
      <App />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)