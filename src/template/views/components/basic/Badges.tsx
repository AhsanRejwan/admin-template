// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import BasicBadge from 'template/sections/components/basic/badges/BasicBadge';
import ButtonBadge from 'template/sections/components/basic/badges/ButtonBadge';
import ContextualBadge from 'template/sections/components/basic/badges/ContextualBadge';
import LightBadge from 'template/sections/components/basic/badges/LightBadge';
import PillBadge from 'template/sections/components/basic/badges/PillBadge';
import ReferenceHeader from 'template/components/ReferenceHeader';

// ==============================|| BASIC - BADGES ||============================== //

export default function BadgesPage() {
  return (
    <>
      <ReferenceHeader
        caption="Documentation and examples for badges, our small count and labeling component."
        link="https://react-bootstrap.netlify.app/docs/components/badge/"
      />
      <Row>
        <Col sm={12}>
          <BasicBadge />
          <ButtonBadge />
          <ContextualBadge />
          <PillBadge />
          <LightBadge />
        </Col>
      </Row>
    </>
  );
}
