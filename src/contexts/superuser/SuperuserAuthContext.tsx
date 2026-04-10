import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import type { TokenResponse } from '@models/auth/TokenResponse';
import {
  SUPERUSER_AUTH_CHANGE_EVENT,
  clearSuperuserSession,
  persistSuperuserSession,
  readSuperuserSession,
} from '@service/auth/SuperuserSessionStorage';

type SuperuserAuthState = {
  isAuthenticated: boolean;
  accessTokenExpiresAt: number | null;
};

type SuperuserAuthContextValue = SuperuserAuthState & {
  login: (response: TokenResponse) => void;
  logout: () => void;
};

const SuperuserAuthContext = createContext<SuperuserAuthContextValue | null>(null);

const getSuperuserAuthState = (): SuperuserAuthState => {
  const session = readSuperuserSession();

  return {
    isAuthenticated: !!session,
    accessTokenExpiresAt: session?.accessTokenExpiresAt ?? null,
  };
};

export const SuperuserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SuperuserAuthState>(getSuperuserAuthState);

  useEffect(() => {
    const syncAuthState = () => {
      setState(getSuperuserAuthState());
    };

    window.addEventListener('storage', syncAuthState);
    window.addEventListener(SUPERUSER_AUTH_CHANGE_EVENT, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(SUPERUSER_AUTH_CHANGE_EVENT, syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (!state.accessTokenExpiresAt) {
      return undefined;
    }

    const remainingLifetime = state.accessTokenExpiresAt - Date.now();

    if (remainingLifetime <= 0) {
      clearSuperuserSession();
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      clearSuperuserSession();
    }, remainingLifetime);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [state.accessTokenExpiresAt]);

  const login = (response: TokenResponse) => {
    persistSuperuserSession(response);
  };

  const logout = () => {
    clearSuperuserSession();
  };

  return (
    <SuperuserAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </SuperuserAuthContext.Provider>
  );
};

export const useSuperuserAuth = () => {
  const context = useContext(SuperuserAuthContext);

  if (!context) {
    throw new Error('useSuperuserAuth must be used within SuperuserAuthProvider');
  }

  return context;
};
