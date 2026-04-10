import type { ReactNode, Ref } from 'react';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

type MainCardProps = {
  children?: ReactNode;
  subheader?: ReactNode;
  footer?: ReactNode;
  secondary?: ReactNode;
  content?: boolean;
  title?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  ref?: Ref<HTMLDivElement>;
};

const MainCard = ({
  children,
  subheader,
  footer,
  secondary,
  content = true,
  title,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  ref,
}: MainCardProps) => {
  return (
    <Card ref={ref} className={className}>
      {title && (
        <Card.Header className={headerClassName}>
          <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-between">
            <Stack className="align-self-center">
              {typeof title === 'string' ? <h5>{title}</h5> : title}
              {subheader && <small className="text-muted">{subheader}</small>}
            </Stack>
            {secondary}
          </Stack>
        </Card.Header>
      )}
      {content && <Card.Body className={bodyClassName}>{children}</Card.Body>}
      {!content && children}
      {footer && <Card.Footer className={footerClassName}>{footer}</Card.Footer>}
    </Card>
  );
};

export default MainCard;
