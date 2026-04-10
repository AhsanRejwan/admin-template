import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { lang } from '@constants/LanguageConstants';

const l = lang.superuser.organizations.deleteModal;

type DeleteOrganizationModalProps = {
  isOpen: boolean;
  displayName: string;
  isPending: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onClose: () => void;
};

const DeleteOrganizationModal = ({
  isOpen,
  displayName,
  isPending,
  errorMessage,
  onConfirm,
  onClose,
}: DeleteOrganizationModalProps) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton={!isPending}>
        <Modal.Title>{l.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger">
            {errorMessage}
          </Alert>
        )}
        <p className="mb-0">{l.message(displayName)}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isPending}>
          {l.cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isPending}>
          {isPending ? l.confirmingLabel : l.confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteOrganizationModal;
