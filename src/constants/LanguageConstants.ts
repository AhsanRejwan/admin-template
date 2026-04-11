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
        superuser: 'Superuser',
      },
      items: {
        home: 'Home',
        superuser: 'Superuser',
        organizations: 'Organizations',
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
      organizations: {
        title: 'Organizations',
        subtitle: 'Manage all organizations on the platform.',
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
    organizations: {
      table: {
        columns: {
          name: 'Name',
          slug: 'Slug',
          updated: 'Updated',
          actions: 'Actions',
        },
        loading: 'Loading organizations…',
        empty: 'No organizations found.',
        error: 'Failed to load organizations.',
        forbidden: 'You do not have permission to view organizations.',
        retry: 'Retry',
        rowAction: (displayName: string) => `View details for ${displayName}`,
        actionsMenu: {
          toggle: 'Row actions',
          edit: 'Edit',
          editHierarchy: 'Edit Hierarchy',
          delete: 'Delete',
          editAriaLabel: 'Edit organization',
          editHierarchyAriaLabel: 'Edit organization hierarchy',
          deleteAriaLabel: 'Delete organization',
        },
      },
      createModal: {
        title: 'Create Organization',
        submitLabel: 'Create',
        submittingLabel: 'Creating…',
      },
      editModal: {
        title: 'Edit Organization',
        submitLabel: 'Save',
        submittingLabel: 'Saving…',
      },
      modal: {
        cancelLabel: 'Cancel',
        closeAriaLabel: 'Close modal',
        serverError: 'Something went wrong. Please try again.',
      },
      deleteModal: {
        title: 'Delete Organization',
        message: (displayName: string) => `Are you sure you want to delete "${displayName}"? This action cannot be undone.`,
        error: 'Failed to delete organization. Please try again.',
        confirmLabel: 'Delete',
        confirmingLabel: 'Deleting…',
        cancelLabel: 'Cancel',
      },
      form: {
        fields: {
          displayName: {
            label: 'Display Name',
            placeholder: 'e.g. Acme Corp',
            validation: {
              required: 'Display name is required',
            },
          },
          slug: {
            label: 'Slug',
            placeholder: 'e.g. acme-corp',
            description: 'Lowercase letters, numbers, and hyphens only.',
            validation: {
              required: 'Slug is required',
              format: 'Slug may only contain lowercase letters, numbers, and hyphens.',
              reserved: 'This slug is reserved and cannot be used.',
            },
          },
          legalName: {
            label: 'Legal Name',
            placeholder: 'e.g. Acme Corporation Ltd.',
            validation: {
              required: 'Legal name is required',
            },
          },
          domainUrl: {
            label: 'Domain URL',
            placeholder: 'https://acme.example.com',
            validation: {
              url: 'Must be a valid absolute URL.',
            },
          },
          contactEmail: {
            label: 'Contact Email',
            placeholder: 'contact@acme.com',
            validation: {
              email: 'Must be a valid email address.',
            },
          },
          contactPhone: {
            label: 'Contact Phone',
            placeholder: '+1 555 000 0000',
          },
          website: {
            label: 'Website',
            placeholder: 'https://www.acme.com',
            validation: {
              url: 'Must be a valid absolute URL.',
            },
          },
          registrationNumber: {
            label: 'Registration Number',
            placeholder: '',
          },
          taxId: {
            label: 'Tax ID',
            placeholder: '',
          },
          country: {
            label: 'Country',
            placeholder: 'e.g. US',
          },
          timezone: {
            label: 'Timezone',
            placeholder: 'e.g. America/New_York',
          },
          addressLine1: {
            label: 'Address Line 1',
            placeholder: '',
          },
          addressLine2: {
            label: 'Address Line 2',
            placeholder: '',
          },
          city: {
            label: 'City',
            placeholder: '',
          },
          state: {
            label: 'State / Province',
            placeholder: '',
          },
          postalCode: {
            label: 'Postal Code',
            placeholder: '',
          },
        },
      },
      details: {
        title: 'Organization Details',
        closeAriaLabel: 'Close details panel',
        loading: 'Loading details…',
        error: 'Failed to load organization details.',
        forbidden: 'You do not have permission to view organization details.',
        empty: 'Select an organization to view its details.',
        retry: 'Retry',
        labels: {
          displayName: 'Display Name',
          legalName: 'Legal Name',
          slug: 'Slug',
          status: 'Status',
          domainUrl: 'Domain URL',
          website: 'Website',
          contactEmail: 'Contact Email',
          contactPhone: 'Contact Phone',
          registrationNumber: 'Registration Number',
          taxId: 'Tax ID',
          country: 'Country',
          timezone: 'Timezone',
          address: 'Address',
          createdAt: 'Created',
          updatedAt: 'Last Updated',
          createdBy: 'Created By',
          updatedBy: 'Updated By',
        },
        status: {
          active: 'Active',
          deleted: 'Deleted',
        },
      },
      actions: {
        create: 'Create Organization',
        createAriaLabel: 'Create a new organization',
      },
      pagination: {
        previous: 'Previous',
        next: 'Next',
        status: (page: number, totalPages: number) => `Page ${page} of ${totalPages}`,
      },
      errors: {
        slugConflict: 'An organization with this slug already exists.',
        generic: 'Something went wrong. Please try again.',
        updateEmpty: 'At least one field must be changed before saving.',
      },
    },
  },
} as const);
