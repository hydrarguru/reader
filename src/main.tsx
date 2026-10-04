import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom';

import { router } from './router.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
