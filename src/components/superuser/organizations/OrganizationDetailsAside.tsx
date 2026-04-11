import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

import { lang } from '@constants/LanguageConstants';
import type { Organization } from '@models/organization/Organization';
import { OrganizationStatus } from '@models/organization/OrganizationStatus';
import InlineStateNotice from '@ui/InlineStateNotice';

const l = lang.superuser.organizations.details;

type DetailRowProps = {
  label: string;
  value?: string | null;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
  if (!value) return null;
  return (
    <div className="org-detail-row">
      <div className="org-detail-row__label">{label}</div>
      <div className="org-detail-row__value">{value}</div>
    </div>
  );
};

const buildAddress = (org: Organization): string | null => {
  const parts = [
    org.addressLine1,
    org.addressLine2,
    org.city,
    org.state,
    org.postalCode,
    org.country,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : null;
};

type OrganizationDetailsAsideProps = {
  isOpen: boolean;
  organization?: Organization;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onClose: () => void;
};

const OrganizationDetailsAside = ({
  isOpen,
  organization,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onClose,
}: OrganizationDetailsAsideProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="org-details-aside__overlay"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <aside
        className={`org-details-aside${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={l.title}
        aria-hidden={!isOpen}
      >
        <div className="org-details-aside__header">
          <h2 className="org-details-aside__title">{l.title}</h2>
          <Button
            ref={closeButtonRef}
            variant="light"
            size="sm"
            onClick={onClose}
            aria-label={l.closeAriaLabel}
          >
            <i className="ti ti-x" />
          </Button>
        </div>

        <div className="org-details-aside__body">
          {!organization && !isLoading && !isError && (
            <InlineStateNotice status="empty" message={l.empty} />
          )}

          {isLoading && (
            <InlineStateNotice status="loading" message={l.loading} />
          )}

          {isError && !isLoading && (
            <InlineStateNotice
              status="error"
              message={errorMessage ?? l.error}
              actionLabel={onRetry ? l.retry : undefined}
              onAction={onRetry}
            />
          )}

          {organization && !isLoading && !isError && (
            <>
              <DetailRow label={l.labels.displayName} value={organization.displayName} />
              <DetailRow label={l.labels.legalName} value={organization.legalName} />
              <DetailRow label={l.labels.slug} value={organization.slug} />
              <DetailRow
                label={l.labels.status}
                value={
                  organization.status === OrganizationStatus.ACTIVE
                    ? l.status.active
                    : l.status.deleted
                }
              />
              <DetailRow label={l.labels.domainUrl} value={organization.domainUrl} />
              <DetailRow label={l.labels.website} value={organization.website} />
              <DetailRow label={l.labels.contactEmail} value={organization.contactEmail} />
              <DetailRow label={l.labels.contactPhone} value={organization.contactPhone} />
              <DetailRow label={l.labels.registrationNumber} value={organization.registrationNumber} />
              <DetailRow label={l.labels.taxId} value={organization.taxId} />
              <DetailRow label={l.labels.country} value={organization.country} />
              <DetailRow label={l.labels.timezone} value={organization.timezone} />
              <DetailRow label={l.labels.address} value={buildAddress(organization)} />

              <hr />

              <DetailRow
                label={l.labels.createdAt}
                value={new Date(organization.createdAt).toLocaleString()}
              />
              <DetailRow
                label={l.labels.updatedAt}
                value={new Date(organization.updatedAt).toLocaleString()}
              />
              <DetailRow label={l.labels.createdBy} value={organization.createdBy} />
              <DetailRow label={l.labels.updatedBy} value={organization.updatedBy} />
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default OrganizationDetailsAside;
