import { lazy } from 'react';

// project-imports
import DashboardLayout from 'template/layout/Dashboard';
import Loadable from 'template/components/Loadable';

// render - bootstrap table pages
const BootstrapTableBasic = Loadable(lazy(() => import('template/views/table/bootstrap-table/BasicTable')));

// ==============================|| TABLES ROUTING ||============================== //

const TablesRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'tables/bootstrap-table',
          children: [
            {
              path: 'basic-table',
              element: <BootstrapTableBasic />
            }
          ]
        }
      ]
    }
  ]
};

export default TablesRoutes;
