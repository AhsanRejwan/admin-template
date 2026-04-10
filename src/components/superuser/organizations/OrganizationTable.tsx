import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import { lang } from '@constants/LanguageConstants';
import type { OrganizationSummary } from '@models/organization/OrganizationSummary';

import OrganizationActionsDropdown from './OrganizationActionsDropdown';

const l = lang.superuser.organizations.table;

type OrganizationTableProps = {
  organizations: OrganizationSummary[];
  isLoading: boolean;
  isError: boolean;
  selectedId: number | null;
  onRowClick: (org: OrganizationSummary) => void;
  onEdit: (org: OrganizationSummary) => void;
  onDelete: (org: OrganizationSummary) => void;
  onRetry: () => void;
};

const OrganizationTable = ({
  organizations,
  isLoading,
  isError,
  selectedId,
  onRowClick,
  onEdit,
  onDelete,
  onRetry,
}: OrganizationTableProps) => {
  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2 py-4 text-muted">
        <Spinner animation="border" size="sm" role="status" />
        <span>{l.loading}</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" className="d-flex align-items-center justify-content-between mb-0">
        <span>{l.error}</span>
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          {l.retry}
        </Button>
      </Alert>
    );
  }

  if (organizations.length === 0) {
    return (
      <p className="text-muted py-4 mb-0 text-center">{l.empty}</p>
    );
  }

  return (
    <Table hover responsive className="mb-0">
      <thead>
        <tr>
          <th>{l.columns.name}</th>
          <th>{l.columns.slug}</th>
          <th>{l.columns.updated}</th>
          <th className="text-end">{l.columns.actions}</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org) => (
          <tr
            key={org.id}
            className={`org-table-row${selectedId === org.id ? ' table-active' : ''}`}
            onClick={() => onRowClick(org)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onRowClick(org);
              }
            }}
            aria-selected={selectedId === org.id}
            aria-label={l.rowAction(org.displayName)}
          >
            <td>
              <div className="fw-semibold">{org.displayName}</div>
              {org.legalName !== org.displayName && (
                <small className="text-muted">{org.legalName}</small>
              )}
            </td>
            <td>
              <code className="text-body-secondary">{org.slug}</code>
            </td>
            <td>
              <small className="text-muted">
                {new Date(org.updatedAt).toLocaleDateString()}
              </small>
            </td>
            <td className="text-end">
              <OrganizationActionsDropdown
                onEdit={() => onEdit(org)}
                onDelete={() => onDelete(org)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrganizationTable;
