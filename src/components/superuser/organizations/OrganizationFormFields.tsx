import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { lang } from '@constants/LanguageConstants';

import type { OrganizationFormValues } from './OrganizationFormModal';

const lf = lang.superuser.organizations.form.fields;

type OrganizationFormFieldsProps = {
  register: UseFormRegister<OrganizationFormValues>;
  errors: FieldErrors<OrganizationFormValues>;
  isEditMode: boolean;
};

const OrganizationFormFields = ({
  register,
  errors,
  isEditMode,
}: OrganizationFormFieldsProps) => {
  const { onChange: slugOnChange, ...slugRest } = register('slug');

  return (
    <>
      {/* Display Name — rendered above slug per spec */}
      <Form.Group className="mb-3" controlId="org-displayName">
        <Form.Label>{lf.displayName.label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={lf.displayName.placeholder}
          isInvalid={!!errors.displayName}
          {...register('displayName')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.displayName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Slug */}
      <Form.Group className="mb-3" controlId="org-slug">
        <Form.Label>{lf.slug.label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={lf.slug.placeholder}
          isInvalid={!!errors.slug}
          disabled={isEditMode}
          onChange={slugOnChange}
          {...slugRest}
        />
        <Form.Text className="text-muted">{lf.slug.description}</Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.slug?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Legal Name */}
      <Form.Group className="mb-3" controlId="org-legalName">
        <Form.Label>{lf.legalName.label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={lf.legalName.placeholder}
          isInvalid={!!errors.legalName}
          {...register('legalName')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.legalName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-contactEmail">
            <Form.Label>{lf.contactEmail.label}</Form.Label>
            <Form.Control
              type="email"
              placeholder={lf.contactEmail.placeholder}
              isInvalid={!!errors.contactEmail}
              {...register('contactEmail')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactEmail?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-contactPhone">
            <Form.Label>{lf.contactPhone.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.contactPhone.placeholder}
              {...register('contactPhone')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-domainUrl">
            <Form.Label>{lf.domainUrl.label}</Form.Label>
            <Form.Control
              type="url"
              placeholder={lf.domainUrl.placeholder}
              isInvalid={!!errors.domainUrl}
              {...register('domainUrl')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.domainUrl?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-website">
            <Form.Label>{lf.website.label}</Form.Label>
            <Form.Control
              type="url"
              placeholder={lf.website.placeholder}
              isInvalid={!!errors.website}
              {...register('website')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.website?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-registrationNumber">
            <Form.Label>{lf.registrationNumber.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.registrationNumber.placeholder}
              {...register('registrationNumber')}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-taxId">
            <Form.Label>{lf.taxId.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.taxId.placeholder}
              {...register('taxId')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-country">
            <Form.Label>{lf.country.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.country.placeholder}
              {...register('country')}
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="org-timezone">
            <Form.Label>{lf.timezone.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.timezone.placeholder}
              {...register('timezone')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="org-addressLine1">
        <Form.Label>{lf.addressLine1.label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={lf.addressLine1.placeholder}
          {...register('addressLine1')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="org-addressLine2">
        <Form.Label>{lf.addressLine2.label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={lf.addressLine2.placeholder}
          {...register('addressLine2')}
        />
      </Form.Group>

      <Row>
        <Col sm={5}>
          <Form.Group className="mb-3" controlId="org-city">
            <Form.Label>{lf.city.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.city.placeholder}
              {...register('city')}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group className="mb-3" controlId="org-state">
            <Form.Label>{lf.state.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.state.placeholder}
              {...register('state')}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-3" controlId="org-postalCode">
            <Form.Label>{lf.postalCode.label}</Form.Label>
            <Form.Control
              type="text"
              placeholder={lf.postalCode.placeholder}
              {...register('postalCode')}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default OrganizationFormFields;
