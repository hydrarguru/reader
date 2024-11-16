import './index.css';
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Suspense fallback={<div>Loading...</div>}>
      <App />
      <Toaster />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)