import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useForm } from 'react-hook-form';

import { lang } from '@constants/LanguageConstants';
import MainCard from '@ui/MainCard';

const usernameRules = {
  required: lang.superuser.auth.loginForm.fields.username.validation.required,
};
const passwordRules = {
  required: lang.superuser.auth.loginForm.fields.password.validation.required,
  minLength: {
    value: 8,
    message: lang.superuser.auth.loginForm.fields.password.validation.minLength,
  },
};

export type SuperuserLoginFormValues = {
  username: string;
  password: string;
};

type SuperuserLoginFormProps = {
  onSubmit: (data: SuperuserLoginFormValues) => void;
  isLoading: boolean;
  serverError?: string;
};

const SuperuserLoginForm = ({ onSubmit, isLoading, serverError }: SuperuserLoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuperuserLoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const getErrorMessage = (message: unknown) => (typeof message === 'string' ? message : '');

  return (
    <MainCard className="mb-0">
      <h4 className="text-center f-w-500 mt-2 mb-3">{lang.superuser.auth.loginForm.title}</h4>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder={lang.superuser.auth.loginForm.fields.username.placeholder}
            autoComplete="username"
            {...register('username', usernameRules)}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {getErrorMessage(errors.username?.message)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <InputGroup hasValidation>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder={lang.superuser.auth.loginForm.fields.password.placeholder}
              autoComplete="current-password"
              {...register('password', passwordRules)}
              isInvalid={!!errors.password}
            />
            <Button
              type="button"
              aria-label={
                showPassword
                  ? lang.superuser.auth.loginForm.actions.hidePasswordAriaLabel
                  : lang.superuser.auth.loginForm.actions.showPasswordAriaLabel
              }
              className="superuser-password-toggle"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
            >
              {showPassword
                ? lang.superuser.auth.loginForm.actions.hidePassword
                : lang.superuser.auth.loginForm.actions.showPassword}
            </Button>
            <Form.Control.Feedback type="invalid">
              {getErrorMessage(errors.password?.message)}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {serverError && (
          <Form.Text className="text-danger d-block mb-3">{serverError}</Form.Text>
        )}
        <div className="text-center mt-4">
          <Button type="submit" className="shadow px-sm-4" disabled={isLoading}>
            {isLoading
              ? lang.superuser.auth.loginForm.actions.submitting
              : lang.superuser.auth.loginForm.actions.submit}
          </Button>
        </div>
      </Form>
    </MainCard>
  );
};

export default SuperuserLoginForm;
