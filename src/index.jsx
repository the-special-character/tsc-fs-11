import React from 'react';
import { createRoot } from 'react-dom/client';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './style.css';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import MainLayout from './layouts/mainLayout';
import Home1 from './pages/home/home1';
import Home2 from './pages/home/home2';
import AuthLayout from './layouts/authLayout';
import Home3 from './pages/home/home3';
import { AuthContext, AuthProvider } from './contexts/auth.context';
// import App from './App';

document.body.innerHTML = '<main id="app"></main>';

const root = createRoot(document.getElementById('app'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            index: true,
            element: <Home1 />,
          },
          {
            path: 'second',
            element: <Home2 />,
          },
          {
            path: 'final',
            element: <Home3 />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);

root.render(
  // <AuthContext.Provider value={{ test: 123 }}>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
  // </AuthContext.Provider>,
);
