// react-bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// project-imports
import ChecksRadios from 'template/sections/components/form-element/CheckRadio';
import CustomForms from 'template/sections/components/form-element/CustomForms';
import DataList from 'template/sections/components/form-element/DataList';
import FormControls from 'template/sections/components/form-element/FormControls';
import FormControlState from 'template/sections/components/form-element/FormControlState';
import FormGrid from 'template/sections/components/form-element/FormGrid';
import HorizontalForm from 'template/sections/components/form-element/HorizontalForm';
import InlineForm from 'template/sections/components/form-element/InlineForm';
import InputGroup from 'template/sections/components/form-element/InputGroup';
import Picker from 'template/sections/components/form-element/Picker';
import Sizing from 'template/sections/components/form-element/Sizing';
import SupportedElements from 'template/sections/components/form-element/SupportedElements';
import Tooltips from 'template/sections/components/form-element/Tooltips';
import ValidationForm from 'template/sections/components/form-element/ValidationForm';

// =============================|| FORM ELEMENT - BASIC ||============================== //

export default function FormBasic() {
  return (
    <Row>
      <Col xs={12}>
        <FormControls />
        <Sizing />
        <Picker />
        <DataList />
        <FormControlState />
        <InlineForm />
        <FormGrid />
        <HorizontalForm />
        <ValidationForm />
        <SupportedElements />
        <Tooltips />
        <ChecksRadios />
        <InputGroup />
        <CustomForms />
      </Col>
    </Row>
  );
}
