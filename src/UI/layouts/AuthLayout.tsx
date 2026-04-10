import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from '@ui/Loader';

const AuthLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
