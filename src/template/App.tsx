import { useRef } from 'react';
import { RouterProvider } from 'react-router-dom';

import './index.scss';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';

// project-imports
import { createTemplateRouter } from 'template/routes';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

type TemplateAppProps = {
  basename?: string;
};

function App({ basename = import.meta.env.VITE_APP_BASE_NAME }: TemplateAppProps) {
  const routerRef = useRef<ReturnType<typeof createTemplateRouter> | null>(null);

  if (!routerRef.current) {
    routerRef.current = createTemplateRouter(basename);
  }

  const router = routerRef.current;

  return <RouterProvider router={router} />;
}

export default App;
