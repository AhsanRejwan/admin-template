import { useRef } from 'react';
import { RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/styles/Global.css';

import { AppProviders } from '@contexts/App/AppProviders';
import { createAppRouter } from '@routes/Index';

type AppProps = {
  basename?: string;
};

const App = ({ basename = import.meta.env.VITE_APP_BASE_NAME }: AppProps) => {
  const routerRef = useRef<ReturnType<typeof createAppRouter> | null>(null);

  if (!routerRef.current) {
    routerRef.current = createAppRouter(basename);
  }

  const router = routerRef.current;

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
