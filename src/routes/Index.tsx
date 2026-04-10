import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTES } from '@constants/Routes';

const router = createBrowserRouter(
  [
    {
      path: ROUTES.home,
        element: <div>App</div>,
    },
  ],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME,
  }
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
