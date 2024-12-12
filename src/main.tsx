import './index.css';
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Routes, Route } from "react-router";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:community" element={<App />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)