import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useForm } from 'react-hook-form';

import MainCard from '@ui/MainCard';

const usernameRules = { required: 'Username is required' };
const passwordRules = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' },
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
      <h4 className="text-center f-w-500 mt-2 mb-3">Superuser Login</h4>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
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
              placeholder="Password"
              autoComplete="current-password"
              {...register('password', passwordRules)}
              isInvalid={!!errors.password}
            />
            <Button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="superuser-password-toggle"
              onClick={() => setShowPassword((currentValue) => !currentValue)}
            >
              {showPassword ? 'Hide' : 'Show'}
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
            {isLoading ? 'Signing in…' : 'Login'}
          </Button>
        </div>
      </Form>
    </MainCard>
  );
};

export default SuperuserLoginForm;
