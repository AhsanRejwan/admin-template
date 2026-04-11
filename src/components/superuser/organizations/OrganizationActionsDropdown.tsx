import type { KeyboardEvent, MouseEvent } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import { lang } from '@constants/LanguageConstants';

const l = lang.superuser.organizations.table.actionsMenu;

type OrganizationActionsDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const stopPropagation = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
  event.stopPropagation();
};

const OrganizationActionsDropdown = ({
  onEdit,
  onDelete,
}: OrganizationActionsDropdownProps) => {
  return (
    <Dropdown
      align="end"
      onClick={stopPropagation}
      onKeyDown={stopPropagation}
    >
      <Dropdown.Toggle variant="light" size="sm" aria-label={l.toggle}>
        <i className="ti ti-dots-vertical" aria-hidden="true" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit} aria-label={l.editAriaLabel}>
          {l.edit}
        </Dropdown.Item>
        <Dropdown.Item onClick={onDelete} className="text-danger" aria-label={l.deleteAriaLabel}>
          {l.delete}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrganizationActionsDropdown;
