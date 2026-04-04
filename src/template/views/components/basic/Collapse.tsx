// react-bootstrap
import Col from 'react-bootstrap/Col';

// project-imports
import AccordionCollapse from 'template/sections/components/basic/collapse/Accordion';
import AccordionFlush from 'template/sections/components/basic/collapse/AccordionFlush';
import BasicCollapse from 'template/sections/components/basic/collapse/BasicCollapse';
import MultipleTargets from 'template/sections/components/basic/collapse/MultipleTargets';
import ReferenceHeader from 'template/components/ReferenceHeader';

// ==============================|| BASIC - COLLAPSE ||============================== //

export default function CollapsePage() {
  return (
    <>
      <ReferenceHeader
        caption="Toggle the visibility of content across your project with a few classes and our JavaScript plugins."
        link="https://react-bootstrap.netlify.app/docs/utilities/transitions/#collapse"
      />
      <Col sm={12}>
        <BasicCollapse />
      </Col>
      <Col className="mb-3" sm={12}>
        <MultipleTargets />
      </Col>
      <Col sm={12}>
        <AccordionCollapse />
      </Col>
      <Col sm={12}>
        <AccordionFlush />
      </Col>
    </>
  );
}
