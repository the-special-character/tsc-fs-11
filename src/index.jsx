import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './style.css';
import MainLayout from './layouts/main.layout';
import AuthLayout from './layouts/auth.layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import configureStore from './configureStore';

const store = configureStore();

document.body.innerHTML = '<main id="app"></main>';

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
]);

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
