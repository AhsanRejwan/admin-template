const deepFreeze = <T>(value: T): Readonly<T> => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);

    for (const nestedValue of Object.values(value as Record<string, unknown>)) {
      deepFreeze(nestedValue);
    }
  }

  return value as Readonly<T>;
};

export const lang = deepFreeze({
  app: {
    brand: {
      name: 'CoPerform',
      logoAlt: 'CoPerform logo',
    },
  },
  layout: {
    sidebar: {
      groups: {
        primary: 'GroupName',
      },
      items: {
        home: 'Home',
        superuser: 'Superuser',
      },
    },
  },
  pages: {
    app: {
      home: {
        title: 'App',
      },
    },
    superuser: {
      home: {
        title: 'Superuser Home',
      },
    },
  },
  superuser: {
    auth: {
      loginForm: {
        title: 'Superuser Login',
        fields: {
          username: {
            placeholder: 'Username',
            validation: {
              required: 'Username is required',
            },
          },
          password: {
            placeholder: 'Password',
            validation: {
              required: 'Password is required',
              minLength: 'Password must be at least 8 characters',
            },
          },
        },
        actions: {
          submit: 'Login',
          submitting: 'Signing in…',
          showPassword: 'Show',
          hidePassword: 'Hide',
          showPasswordAriaLabel: 'Show password',
          hidePasswordAriaLabel: 'Hide password',
        },
        errors: {
          invalidCredentials: 'Invalid credentials. Please check your username and password.',
          generic: 'Something went wrong. Please try again.',
        },
      },
    },
  },
} as const);
