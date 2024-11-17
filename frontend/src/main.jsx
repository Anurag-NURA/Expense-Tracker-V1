import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import { HomePage, ExpensesPage, ProfilePage, NotFoundPage } from '@pages';
import { PrivateRoute } from '@components';
import { Login, Register } from '@screens';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />
      },
      {
        index: false,
        path: '/expenses',
        element: <PrivateRoute />,
        children: [{
          path: '',
          element: <ExpensesPage />
        }]
      },
      {
        index: false,
        path: '/profile',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProfilePage />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
