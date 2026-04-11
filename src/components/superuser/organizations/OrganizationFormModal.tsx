import { type ChangeEvent, type FocusEvent, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

import { lang } from '@constants/LanguageConstants';
import type { ApiFieldError } from '@models/common/ApiFieldError';
import type { Organization } from '@models/organization/Organization';
import InlineStateNotice from '@ui/InlineStateNotice';

import OrganizationFormFields from './OrganizationFormFields';

const l = lang.superuser.organizations;
const lf = lang.superuser.organizations.form.fields;

const SLUG_FORMAT_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESERVED_SLUGS = new Set(['api', 'www', 'admin', 'auth', 'docs', 'health', 'actuator']);

export type OrganizationFormValues = {
  displayName: string;
  slug: string;
  legalName: string;
  domainUrl: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  registrationNumber: string;
  taxId: string;
  country: string;
  timezone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
};

const emptyValues: OrganizationFormValues = {
  displayName: '',
  slug: '',
  legalName: '',
  domainUrl: '',
  contactEmail: '',
  contactPhone: '',
  website: '',
  registrationNumber: '',
  taxId: '',
  country: '',
  timezone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
};

const EDITABLE_FORM_FIELDS: Array<keyof OrganizationFormValues> = [
  'displayName',
  'legalName',
  'domainUrl',
  'contactEmail',
  'contactPhone',
  'website',
  'registrationNumber',
  'taxId',
  'country',
  'timezone',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'postalCode',
];

const normalizeComparableValue = (value: string | null | undefined) => value?.trim() ?? '';

const toFormValues = (org: Organization): OrganizationFormValues => ({
  displayName: org.displayName,
  slug: org.slug,
  legalName: org.legalName,
  domainUrl: org.domainUrl ?? '',
  contactEmail: org.contactEmail ?? '',
  contactPhone: org.contactPhone ?? '',
  website: org.website ?? '',
  registrationNumber: org.registrationNumber ?? '',
  taxId: org.taxId ?? '',
  country: org.country ?? '',
  timezone: org.timezone ?? '',
  addressLine1: org.addressLine1 ?? '',
  addressLine2: org.addressLine2 ?? '',
  city: org.city ?? '',
  state: org.state ?? '',
  postalCode: org.postalCode ?? '',
});

const suggestSlug = (displayName: string): string =>
  displayName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

const isAbsoluteUrl = (value: string): boolean => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

type OrganizationFormModalProps = {
  isOpen: boolean;
  mode: 'create' | 'edit';
  organization?: Organization;
  isLoadingOrganization?: boolean;
  isPending: boolean;
  serverError?: string;
  fieldErrors?: ApiFieldError[];
  organizationLoadError?: string;
  onRetryLoadOrganization?: () => void;
  onSubmit: (values: OrganizationFormValues) => void;
  onClose: () => void;
};

const OrganizationFormModal = ({
  isOpen,
  mode,
  organization,
  isLoadingOrganization = false,
  isPending,
  serverError,
  fieldErrors,
  organizationLoadError,
  onRetryLoadOrganization,
  onSubmit,
  onClose,
}: OrganizationFormModalProps) => {
  const isEditMode = mode === 'edit';
  const slugManuallyEdited = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<OrganizationFormValues>({
    mode: 'onBlur',
    defaultValues: emptyValues,
  });

  // Reset form state whenever the modal opens or the target organization changes.
  useEffect(() => {
    if (isOpen) {
      slugManuallyEdited.current = false;
      reset(isEditMode && organization ? toFormValues(organization) : emptyValues);
    }
  }, [isOpen, isEditMode, organization, reset]);

  // Map server field errors back into RHF after a failed submission.
  useEffect(() => {
    if (fieldErrors && fieldErrors.length > 0) {
      for (const fe of fieldErrors) {
        setError(fe.field as keyof OrganizationFormValues, {
          type: 'server',
          message: fe.message,
        });
      }
    }
  }, [fieldErrors, setError]);

  // Auto-suggest slug from displayName until the user manually edits the slug field.
  const displayNameValue = watch('displayName');
  useEffect(() => {
    if (!isEditMode && !slugManuallyEdited.current) {
      setValue('slug', suggestSlug(displayNameValue), { shouldValidate: false });
    }
  }, [displayNameValue, isEditMode, setValue]);

  const handleClose = () => {
    if (!isPending) onClose();
  };

  const handleValidSubmit = (values: OrganizationFormValues) => {
    if (
      isEditMode &&
      organization &&
      !EDITABLE_FORM_FIELDS.some(
        (field) => normalizeComparableValue(values[field]) !== normalizeComparableValue(toFormValues(organization)[field]),
      )
    ) {
      setError('root', {
        type: 'manual',
        message: l.errors.updateEmpty,
      });
      return;
    }

    clearErrors('root');

    onSubmit({
      ...values,
      slug: values.slug.trim().toLowerCase(),
      displayName: values.displayName.trim(),
      legalName: values.legalName.trim(),
    });
  };

  // Register slug with blur normalization and client-side validation.
  const { onBlur: slugOnBlur, onChange: slugOnChange, ...slugRestProps } = register('slug', {
    required: isEditMode ? undefined : lf.slug.validation.required,
    validate: (value) => {
      if (isEditMode) return true;
      const trimmed = value.trim();
      if (!SLUG_FORMAT_REGEX.test(trimmed)) return lf.slug.validation.format;
      if (RESERVED_SLUGS.has(trimmed)) return lf.slug.validation.reserved;
      return true;
    },
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      const normalized = e.target.value.trim().toLowerCase();
      setValue('slug', normalized, { shouldValidate: true });
    },
  });

  const slugRegistration = {
    ...slugRestProps,
    onBlur: slugOnBlur,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      slugManuallyEdited.current = true;
      return slugOnChange(e);
    },
  };

  // Build a register wrapper that injects validation rules for required fields and URLs.
  // Cast required because the generic TFieldName constraint is too narrow for the wrapper pattern.
  const registerWithValidation = ((name: keyof OrganizationFormValues, options?: object) => {
    if (name === 'slug') return slugRegistration;

    const extraOptions: Record<string, unknown> = {};

    if (name === 'displayName') {
      extraOptions.required = isEditMode ? undefined : lf.displayName.validation.required;
    }
    if (name === 'legalName') {
      extraOptions.required = isEditMode ? undefined : lf.legalName.validation.required;
    }
    if (name === 'contactEmail') {
      extraOptions.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: lf.contactEmail.validation.email,
      };
    }
    if (name === 'domainUrl') {
      extraOptions.validate = (v: unknown) =>
        isAbsoluteUrl(v as string) || lf.domainUrl.validation.url;
    }
    if (name === 'website') {
      extraOptions.validate = (v: unknown) =>
        isAbsoluteUrl(v as string) || lf.website.validation.url;
    }

    return register(name, { ...extraOptions, ...options } as Parameters<typeof register>[1]);
  }) as typeof register;

  const modalTitle = isEditMode ? l.editModal.title : l.createModal.title;
  const submitLabel = isEditMode
    ? isPending ? l.editModal.submittingLabel : l.editModal.submitLabel
    : isPending ? l.createModal.submittingLabel : l.createModal.submitLabel;
  const modalError = errors.root?.message || serverError;
  const cannotSubmitEdit = isEditMode && (isLoadingOrganization || !!organizationLoadError || !organization);

  return (
    <Modal show={isOpen} onHide={handleClose} size="lg" backdrop="static" centered>
      <Form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
        <Modal.Header closeButton aria-label={l.modal.closeAriaLabel}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {isEditMode && isLoadingOrganization ? (
            <InlineStateNotice status="loading" message={lang.superuser.organizations.details.loading} centered />
          ) : isEditMode && organizationLoadError && !organization ? (
            <InlineStateNotice
              status="error"
              message={organizationLoadError}
              actionLabel={onRetryLoadOrganization ? lang.superuser.organizations.details.retry : undefined}
              onAction={onRetryLoadOrganization}
            />
          ) : (
            <>
              {modalError && (
                <Alert variant="danger" className="mb-3">
                  {modalError}
                </Alert>
              )}

              <OrganizationFormFields
                register={registerWithValidation}
                errors={errors}
                isEditMode={isEditMode}
              />
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isPending}>
            {l.modal.cancelLabel}
          </Button>
          <Button variant="primary" type="submit" disabled={isPending || cannotSubmitEdit}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrganizationFormModal;
