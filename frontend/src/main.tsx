import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import CommunityPage from './pages/CommunityPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/c/:category',
    element: <CommunityPage />
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider theme='dark'>
      <RouterProvider router={router}/>
    </CustomProvider>
  </React.StrictMode>
)
