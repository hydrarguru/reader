import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router/dom';

import { router } from './router.tsx';
import { AuthProvider } from './components/Auth/AuthProvider.tsx';
import { VotesProvider } from './components/Votes/VotesProvider.tsx';
import { ThemeProvider } from './components/Theme/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <VotesProvider>
          <RouterProvider router={router} />
        </VotesProvider>
      </AuthProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
