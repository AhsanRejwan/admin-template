import '@assets/styles/SuperuserAuth.css';

import { Navigate } from 'react-router-dom';

import { SuperuserLoginContainer } from '@containers/superuser/auth/SuperuserLoginContainer';
import { ROUTES } from '@constants/Routes';
import { useSuperuserAuth } from '@contexts/superuser/SuperuserAuthContext';

const SuperuserAuthPage = () => {
  const { isAuthenticated } = useSuperuserAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.superuser} replace />;
  }

  return (
    <div className="superuser-auth-page">
      <div className="superuser-auth-shell">
        <div className="superuser-auth-panel">
          <div className="position-relative">
            <div className="superuser-auth-backdrop" aria-hidden="true">
              <span className="superuser-auth-orb superuser-auth-orb-primary" />
              <span className="superuser-auth-orb superuser-auth-orb-accent" />
              <span className="superuser-auth-orb superuser-auth-orb-accent-alt" />
              <span className="superuser-auth-orb superuser-auth-orb-secondary" />
            </div>
            <SuperuserLoginContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperuserAuthPage;
