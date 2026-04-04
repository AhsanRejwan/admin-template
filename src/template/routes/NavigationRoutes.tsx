import { lazy } from 'react';

// project-imports
import Loadable from 'template/components/Loadable';
import DashboardLayout from 'template/layout/Dashboard';

// render - dashboard pages
const DefaultPages = Loadable(lazy(() => import('template/views/navigation/dashboard/Default')));

// ==============================|| NAVIGATION ROUTING ||============================== //

const NavigationRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          element: <DefaultPages />
        }
      ]
    }
  ]
};

export default NavigationRoutes;
