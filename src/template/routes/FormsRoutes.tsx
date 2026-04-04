import { lazy } from 'react';

// project-imports
import DashboardLayout from 'template/layout/Dashboard';
import Loadable from 'template/components/Loadable';

// render - forms element pages
const FormBasic = Loadable(lazy(() => import('template/views/forms/form-element/FormBasic')));

// ==============================|| FORMS ROUTING ||============================== //

const FormsRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'forms',
          children: [
            {
              path: 'form-elements',
              children: [{ path: 'basic', element: <FormBasic /> }]
            }
          ]
        }
      ]
    }
  ]
};

export default FormsRoutes;
