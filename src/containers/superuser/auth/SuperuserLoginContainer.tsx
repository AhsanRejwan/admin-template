import { useNavigate } from 'react-router-dom';

import { isAxiosError } from 'axios';

import { ROUTES } from '@constants/Routes';
import { useSuperuserAuth } from '@contexts/superuser/SuperuserAuthContext';
import { useLogin } from '@hooks/service/auth/useLogin';

import SuperuserLoginForm, { type SuperuserLoginFormValues } from '@components/superuser/auth/SuperuserLoginForm';

export const SuperuserLoginContainer = () => {
  const navigate = useNavigate();
  const { login: storeToken } = useSuperuserAuth();
  const { mutate: submitLogin, isPending, error } = useLogin();

  const handleSubmit = (data: SuperuserLoginFormValues) => {
    submitLogin(data, {
      onSuccess: (response) => {
        storeToken(response);
        navigate(ROUTES.superuser, { replace: true });
      },
    });
  };

  const deriveServerError = () => {
    if (!error) return undefined;

    if (isAxiosError(error) && error.response?.status === 401) {
      return 'Invalid credentials. Please check your username and password.';
    }

    return 'Something went wrong. Please try again.';
  };

  return (
    <SuperuserLoginForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      serverError={deriveServerError()}
    />
  );
};
