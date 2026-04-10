import { createBrowserRouter } from 'react-router-dom';

// project-imports
import ChartMapRoutes from './ChartMapRoutes';
import ComponentsRoutes from './ComponentsRoutes';
import FormsRoutes from './FormsRoutes';
import PagesRoutes from './PagesRoutes';
import NavigationRoutes from './NavigationRoutes';
import TablesRoutes from './TablesRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const routes = [NavigationRoutes, ComponentsRoutes, FormsRoutes, TablesRoutes, PagesRoutes, ChartMapRoutes];

export const createTemplateRouter = (basename = import.meta.env.VITE_APP_BASE_NAME) =>
  createBrowserRouter(routes, {
    basename
  });
