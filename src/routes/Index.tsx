import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@constants/Routes';
import { SuperuserAuthProvider } from '@contexts/superuser/SuperuserAuthContext';
import { SuperuserProtectedRoute } from '@routes/SuperuserProtectedRoute';
import AuthLayout from '@ui/layouts/AuthLayout';
import SuperuserAuthPage from '@pages/superuser/SuperuserAuthPage';
import SuperuserHomePage from '@pages/superuser/SuperuserHomePage';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.home,
      element: <div>App</div>,
    },
    {
      path: ROUTES.superuser,
      element: (
        <SuperuserAuthProvider>
          <AuthLayout />
        </SuperuserAuthProvider>
      ),
      children: [
        {
          path: '',
          element: <SuperuserProtectedRoute />,
          children: [
            { index: true, element: <SuperuserHomePage /> },
          ],
        },
        {
          path: 'auth',
          element: <SuperuserAuthPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME,
  }
);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
