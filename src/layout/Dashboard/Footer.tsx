// react-bootstrap
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import branding from 'branding.json';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pc-footer">
      <div className="footer-wrapper container-fluid">
        <Row className="justify-content-center justify-content-md-between">
          <Col xs="auto" className="my-1">
            <p className="m-0">{year} {branding.brandName}</p>
          </Col>

          <Col xs="auto" className="my-1">
            <Stack direction="horizontal" gap={3} className="justify-content-center">
              <Nav.Link className="p-0" as="a" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="p-0" as="a" href="mailto:hello@example.com">
                Contact
              </Nav.Link>
            </Stack>
          </Col>
        </Row>
      </div>
    </footer>
  );
}
