import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@constants/Routes';
import { useSuperuserAuth } from '@contexts/superuser/SuperuserAuthContext';

export const SuperuserProtectedRoute = () => {
  const { isAuthenticated } = useSuperuserAuth();

  if (!isAuthenticated) return <Navigate to={ROUTES.superuserAuth} replace />;

  return <Outlet />;
};
