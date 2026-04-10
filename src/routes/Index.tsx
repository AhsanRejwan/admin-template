import { createBrowserRouter } from 'react-router-dom';

import { lang } from '@constants/LanguageConstants';
import { ROUTES } from '@constants/Routes';
import { SuperuserAuthProvider } from '@contexts/superuser/SuperuserAuthContext';
import { SuperuserProtectedRoute } from '@routes/SuperuserProtectedRoute';
import AuthLayout from '@ui/layouts/AuthLayout';
import MainLayout from '@ui/layouts/MainLayout';
import AppHomePage from '@pages/app/AppHomePage';
import SuperuserAuthPage from '@pages/superuser/SuperuserAuthPage';
import SuperuserHomePage from '@pages/superuser/SuperuserHomePage';

const homeSidebarGroups = [
  {
    groupLabel: lang.layout.sidebar.groups.primary,
    items: [{ label: lang.layout.sidebar.items.home, to: ROUTES.home }],
  },
];

const superuserSidebarGroups = [
  {
    groupLabel: lang.layout.sidebar.groups.primary,
    items: [{ label: lang.layout.sidebar.items.superuser, to: ROUTES.superuser }],
  },
];

const routes = [
  {
    path: ROUTES.home,
    element: <MainLayout sidebarGroups={homeSidebarGroups} />,
    children: [{ index: true, element: <AppHomePage /> }],
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
          {
            element: <MainLayout sidebarGroups={superuserSidebarGroups} />,
            children: [{ index: true, element: <SuperuserHomePage /> }],
          },
        ],
      },
      {
        path: 'auth',
        element: <SuperuserAuthPage />,
      },
    ],
  },
];

export const createAppRouter = (basename = import.meta.env.VITE_APP_BASE_NAME) =>
  createBrowserRouter([
    ...routes,
  ], {
    basename,
  });
