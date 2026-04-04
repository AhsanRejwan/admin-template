import { lazy } from 'react';

// project-imports
import DashboardLayout from 'template/layout/Dashboard';
import Loadable from 'template/components/Loadable';

// render - basic component pages
const BasicButton = Loadable(lazy(() => import('template/views/components/basic/Button')));
const BasicBadges = Loadable(lazy(() => import('template/views/components/basic/Badges')));
const BasicBreadcrumb = Loadable(lazy(() => import('template/views/components/basic/Breadcrumb')));
const BasicCollapse = Loadable(lazy(() => import('template/views/components/basic/Collapse')));
const BasicTabsPills = Loadable(lazy(() => import('template/views/components/basic/TabsPills')));
const BasicTypography = Loadable(lazy(() => import('template/views/components/basic/Typography')));

// ==============================|| COMPONENT ROUTING ||============================== //

const ComponentsRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'basic',
          children: [
            {
              path: 'buttons',
              element: <BasicButton />
            },
            {
              path: 'badges',
              element: <BasicBadges />
            },
            {
              path: 'breadcrumb',
              element: <BasicBreadcrumb />
            },
            {
              path: 'collapse',
              element: <BasicCollapse />
            },
            {
              path: 'tabs-pills',
              element: <BasicTabsPills />
            },
            {
              path: 'typography',
              element: <BasicTypography />
            }
          ]
        }
      ]
    }
  ]
};

export default ComponentsRoutes;
