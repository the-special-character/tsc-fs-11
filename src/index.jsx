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
import axiosInstance from './utils';

const store = configureStore();

// store.dispatch({ type: 'LOGOUT' });
store.dispatch({ type: 'LOGIN' });
store.dispatch({ type: 'LOGIN' });
store.dispatch({ type: 'LOGIN' });

const user = localStorage.getItem('user');

if (user) {
  store.dispatch({ type: 'LOAD_USER_SUCCESS', payload: JSON.parse(user) });
}

document.body.innerHTML = '<main id="app"></main>';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const res = await Promise.all([
            axiosInstance.get('660/products'),
            axiosInstance.get('660/cart'),
          ]);
          store.dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res[0] });
          store.dispatch({ type: 'LOAD_CART_SUCCESS', payload: res[1] });
          return res;
        },
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
