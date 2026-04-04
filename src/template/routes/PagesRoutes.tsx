import { lazy } from 'react';

// project-imports
import Loadable from 'template/components/Loadable';
import AuthLayout from 'template/layout/Auth';

// render - login pages
const LoginPage = Loadable(lazy(() => import('template/views/auth/login/Login')));

// render - register pages
const RegisterPage = Loadable(lazy(() => import('template/views/auth/register/Register')));

// ==============================|| AUTH PAGES ROUTING ||============================== //

const PagesRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        }
      ]
    }
  ]
};

export default PagesRoutes;
