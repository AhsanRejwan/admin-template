import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type InlineStateNoticeProps = {
  status: 'loading' | 'error' | 'empty';
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  centered?: boolean;
  className?: string;
};

const InlineStateNotice = ({
  status,
  message,
  actionLabel,
  onAction,
  centered = false,
  className,
}: InlineStateNoticeProps) => {
  if (status === 'loading') {
    return (
      <div
        className={`d-flex align-items-center gap-2 py-4 text-muted${centered ? ' justify-content-center' : ''}${className ? ` ${className}` : ''}`}
        aria-live="polite"
      >
        <Spinner animation="border" size="sm" role="status" />
        <span>{message}</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <Alert
        variant="danger"
        className={`mb-0${className ? ` ${className}` : ''}`}
      >
        <div className={`d-flex align-items-center gap-3${actionLabel && onAction ? ' justify-content-between' : ''}`}>
          <span>{message}</span>
          {actionLabel && onAction && (
            <Button type="button" variant="outline-danger" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      </Alert>
    );
  }

  return (
    <p
      className={`mb-0 py-4 text-muted${centered ? ' text-center' : ''}${className ? ` ${className}` : ''}`}
      aria-live="polite"
    >
      {message}
    </p>
  );
};

export default InlineStateNotice;
