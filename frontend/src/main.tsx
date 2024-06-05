import './assets/main.css';
import { CustomProvider } from 'rsuite';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import RegisterPage from './pages/RegisterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/c/:community',
    element: <App />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme='dark'>
      <RouterProvider router={router}/>
    </CustomProvider>
  </React.StrictMode>
)