import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import '@assets/styles/OrganizationManagement.css';

import { lang } from '@constants/LanguageConstants';
import { useCreateOrganization } from '@hooks/service/organization/useCreateOrganization';
import { useDeleteOrganization } from '@hooks/service/organization/useDeleteOrganization';
import { useGetOrganization } from '@hooks/service/organization/useGetOrganization';
import { useGetOrganizations } from '@hooks/service/organization/useGetOrganizations';
import { useUpdateOrganization } from '@hooks/service/organization/useUpdateOrganization';
import type { ApiFieldError } from '@models/common/ApiFieldError';
import type { OrganizationSummary } from '@models/organization/OrganizationSummary';
import type { UpdateOrganizationRequest } from '@models/organization/UpdateOrganizationRequest';
import { parseApiError } from '@service/http/parseApiError';
import DeleteOrganizationModal from '@components/superuser/organizations/DeleteOrganizationModal';
import OrganizationDetailsAside from '@components/superuser/organizations/OrganizationDetailsAside';
import OrganizationFormModal from '@components/superuser/organizations/OrganizationFormModal';
import type { OrganizationFormValues } from '@components/superuser/organizations/OrganizationFormModal';
import OrganizationTable from '@components/superuser/organizations/OrganizationTable';
import MainCard from '@ui/MainCard';

const l = lang.superuser.organizations;
const PAGE_SIZE = 20;

const toUpdateRequest = (values: OrganizationFormValues): UpdateOrganizationRequest => ({
  legalName: values.legalName.trim(),
  displayName: values.displayName.trim(),
  domainUrl: values.domainUrl.trim() || undefined,
  contactEmail: values.contactEmail.trim() || undefined,
  contactPhone: values.contactPhone.trim() || undefined,
  website: values.website.trim() || undefined,
  registrationNumber: values.registrationNumber.trim() || undefined,
  taxId: values.taxId.trim() || undefined,
  country: values.country.trim() || undefined,
  timezone: values.timezone.trim() || undefined,
  addressLine1: values.addressLine1.trim() || undefined,
  addressLine2: values.addressLine2.trim() || undefined,
  city: values.city.trim() || undefined,
  state: values.state.trim() || undefined,
  postalCode: values.postalCode.trim() || undefined,
});

const OrganizationManagementContainer = () => {
  const [page, setPage] = useState(0);

  // Details aside state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<OrganizationSummary | null>(null);
  const [deleteServerError, setDeleteServerError] = useState<string | undefined>();

  // Server error state for modals
  const [formServerError, setFormServerError] = useState<string | undefined>();
  const [formFieldErrors, setFormFieldErrors] = useState<ApiFieldError[]>([]);

  // Data queries
  const listQuery = useGetOrganizations(page, PAGE_SIZE);
  const detailsQuery = useGetOrganization(selectedId);

  // Mutations
  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const organizations = listQuery.data?.items ?? [];
  const totalPages = listQuery.data?.totalPages ?? 0;

  useEffect(() => {
    if (!listQuery.data) return;

    const lastAvailablePage = Math.max(listQuery.data.totalPages - 1, 0);

    if (page > lastAvailablePage) {
      setPage(lastAvailablePage);
    }
  }, [listQuery.data, page]);

  useEffect(() => {
    if (!listQuery.data || selectedId === null || listQuery.data.page !== page) return;

    const isSelectedOnCurrentPage = listQuery.data.items.some((organization) => organization.id === selectedId);

    if (!isSelectedOnCurrentPage) {
      setSelectedId(null);
      setIsAsideOpen(false);
    }
  }, [listQuery.data, page, selectedId]);

  // Row click — open details aside
  const handleRowClick = (org: OrganizationSummary) => {
    setSelectedId(org.id);
    setIsAsideOpen(true);
  };

  // Edit flow — set selectedId to trigger the details fetch, then open modal.
  // The modal shows a loading state until detailsQuery resolves.
  const handleEditClick = (org: OrganizationSummary) => {
    setSelectedId(org.id);
    setFormServerError(undefined);
    setFormFieldErrors([]);
    setIsEditOpen(true);
  };

  // Delete flow
  const handleDeleteClick = (org: OrganizationSummary) => {
    setDeleteServerError(undefined);
    setDeleteTarget(org);
    setIsDeleteOpen(true);
  };

  // Create submit
  const handleCreateSubmit = (values: OrganizationFormValues) => {
    setFormServerError(undefined);
    setFormFieldErrors([]);

    createMutation.mutate(
      {
        slug: values.slug.trim().toLowerCase(),
        legalName: values.legalName.trim(),
        displayName: values.displayName.trim(),
        domainUrl: values.domainUrl.trim() || undefined,
        contactEmail: values.contactEmail.trim() || undefined,
        contactPhone: values.contactPhone.trim() || undefined,
        website: values.website.trim() || undefined,
        registrationNumber: values.registrationNumber.trim() || undefined,
        taxId: values.taxId.trim() || undefined,
        country: values.country.trim() || undefined,
        timezone: values.timezone.trim() || undefined,
        addressLine1: values.addressLine1.trim() || undefined,
        addressLine2: values.addressLine2.trim() || undefined,
        city: values.city.trim() || undefined,
        state: values.state.trim() || undefined,
        postalCode: values.postalCode.trim() || undefined,
      },
      {
        onSuccess: () => {
          setIsCreateOpen(false);
          setPage(0);
        },
        onError: (error) => {
          const parsed = parseApiError(error);
          if (parsed.fieldErrors.length > 0) {
            setFormFieldErrors(parsed.fieldErrors);
          } else if (parsed.status === 409) {
            setFormFieldErrors([{ field: 'slug', message: l.errors.slugConflict }]);
          } else {
            setFormServerError(parsed.message || l.errors.generic);
          }
        },
      },
    );
  };

  // Edit submit — send full editable snapshot
  const handleEditSubmit = (values: OrganizationFormValues) => {
    if (!selectedId) return;

    setFormServerError(undefined);
    setFormFieldErrors([]);

    updateMutation.mutate(
      { id: selectedId, request: toUpdateRequest(values) },
      {
        onSuccess: () => {
          setIsEditOpen(false);
        },
        onError: (error) => {
          const parsed = parseApiError(error);
          if (parsed.fieldErrors.length > 0) {
            setFormFieldErrors(parsed.fieldErrors);
          } else {
            setFormServerError(parsed.message || l.errors.generic);
          }
        },
      },
    );
  };

  // Delete confirm
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setDeleteServerError(undefined);
        if (selectedId === deleteTarget.id) {
          setIsAsideOpen(false);
          setSelectedId(null);
        }
        setDeleteTarget(null);
      },
      onError: (error) => {
        const parsed = parseApiError(error);
        setDeleteServerError(parsed.message || l.deleteModal.error);
      },
    });
  };

  const handleCloseCreate = () => {
    if (!createMutation.isPending) {
      setIsCreateOpen(false);
      setFormServerError(undefined);
      setFormFieldErrors([]);
    }
  };

  const handleCloseEdit = () => {
    if (!updateMutation.isPending) {
      setIsEditOpen(false);
      setFormServerError(undefined);
      setFormFieldErrors([]);
    }
  };

  return (
    <>
      <MainCard
        title={lang.pages.superuser.organizations.title}
        subheader={lang.pages.superuser.organizations.subtitle}
        secondary={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setFormServerError(undefined);
              setFormFieldErrors([]);
              setIsCreateOpen(true);
            }}
            aria-label={l.actions.createAriaLabel}
          >
            {l.actions.create}
          </Button>
        }
      >
        <OrganizationTable
          organizations={organizations}
          isLoading={listQuery.isLoading}
          isError={listQuery.isError}
          selectedId={selectedId}
          onRowClick={handleRowClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRetry={() => listQuery.refetch()}
        />

        {totalPages > 1 && (
          <Stack direction="horizontal" gap={2} className="mt-3 justify-content-end">
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              {l.pagination.previous}
            </Button>
            <span className="text-muted small">
              {l.pagination.status(page + 1, totalPages)}
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              {l.pagination.next}
            </Button>
          </Stack>
        )}
      </MainCard>

      <OrganizationDetailsAside
        isOpen={isAsideOpen}
        organization={detailsQuery.data}
        isLoading={detailsQuery.isLoading}
        isError={detailsQuery.isError}
        onClose={() => setIsAsideOpen(false)}
      />

      <OrganizationFormModal
        isOpen={isCreateOpen}
        mode="create"
        isPending={createMutation.isPending}
        serverError={formServerError}
        fieldErrors={formFieldErrors}
        onSubmit={handleCreateSubmit}
        onClose={handleCloseCreate}
      />

      <OrganizationFormModal
        isOpen={isEditOpen}
        mode="edit"
        organization={detailsQuery.data}
        isLoadingOrganization={detailsQuery.isLoading}
        isPending={updateMutation.isPending}
        serverError={formServerError}
        fieldErrors={formFieldErrors}
        organizationLoadError={detailsQuery.isError ? l.details.error : undefined}
        onSubmit={handleEditSubmit}
        onClose={handleCloseEdit}
      />

      <DeleteOrganizationModal
        isOpen={isDeleteOpen}
        displayName={deleteTarget?.displayName ?? ''}
        isPending={deleteMutation.isPending}
        errorMessage={deleteServerError}
        onConfirm={handleDeleteConfirm}
        onClose={() => {
          if (!deleteMutation.isPending) {
            setIsDeleteOpen(false);
            setDeleteServerError(undefined);
            setDeleteTarget(null);
          }
        }}
      />
    </>
  );
};

export default OrganizationManagementContainer;
