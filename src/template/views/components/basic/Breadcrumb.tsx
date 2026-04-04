// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BreadcrumbBasic from 'template/sections/components/basic/breadcrumb/BreadcrumbBasic';
import BreadcrumbCharacter from 'template/sections/components/basic/breadcrumb/BreadcrumbCharacter';
import BreadcrumbEmbedded from 'template/sections/components/basic/breadcrumb/BreadcrumbEmbedded';
import BreadcrumbIcon from 'template/sections/components/basic/breadcrumb/BreadcrumbIcon';
import ReferenceHeader from 'template/components/ReferenceHeader';

// ==============================|| BASIC - BREADCRUMB ||============================== //

export default function BreadcrumbPage() {
  return (
    <>
      <ReferenceHeader
        caption="Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS."
        link="https://react-bootstrap.netlify.app/docs/components/breadcrumb"
      />
      <Row>
        <Col sm={6}>
          <BreadcrumbBasic />
        </Col>
        <Col sm={6}>
          <BreadcrumbIcon />
        </Col>
        <Col sm={6}>
          <BreadcrumbCharacter />
        </Col>
        <Col sm={6}>
          <BreadcrumbEmbedded />
        </Col>
      </Row>
    </>
  );
}
