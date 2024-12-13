import './index.css';
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.tsx'
import { Profile } from './components/Pages/Profile.tsx';
import { Settings } from './components/Pages/Settings.tsx';

import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/c/:community" element={<App />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
)