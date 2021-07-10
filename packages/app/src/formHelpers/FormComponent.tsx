import './FormInputComponent.css';
import React, { FunctionComponent } from 'react';
import { ComponentTextInput } from './ComponentTextInput';
import { FormSwitchComponent } from './FormSwitchComponent';
import { FormSelectComponent } from './FormSelectComponent';
import { FormikErrors, FormikTouched } from 'formik';
import { GridItem } from '@patternfly/react-core';
import { FormCheckboxComponent } from './FormCheckboxComponent';
import { FormDatePicker } from './FormDatePicker';
export interface IFormComponentProps {
  candidate: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  propertyChange: (name: string, selection: any) => void;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
}
export interface PropertyValidationResult {
  property: string;
  message: string;
  displayName: string;
}
export const FormComponent: FunctionComponent<IFormComponentProps> = ({
  candidate,
  errors,
  touched,
  setFieldValue,
  propertyChange,
}) => {
  if (candidate.type === 'boolean') {
    return (
      <GridItem lg={candidate?.gridWidthLg} sm={candidate?.gridWidthSm}>
        <FormCheckboxComponent
          fieldId={candidate.name}
          name={candidate.name}
          label={candidate.displayName}
          setFieldValue={setFieldValue}
          description={candidate.description}
          isChecked={typeof candidate.defaultValue !== undefined && candidate.defaultValue === true}
          propertyChange={propertyChange}
        />
      </GridItem>
    );
  } else if (candidate.type === 'boolean-switch') {
    return (
      <GridItem lg={candidate?.gridWidthLg} sm={candidate?.gridWidthSm}>
        <FormSwitchComponent
          fieldId={candidate.name}
          name={candidate.name}
          label={candidate.displayName}
          setFieldValue={setFieldValue}
          description={candidate.description}
          isChecked={typeof candidate.defaultValue !== undefined && candidate.defaultValue === true}
          propertyChange={propertyChange}
        />
      </GridItem>
    );
  } else if (candidate.type === 'picker') {
    return (
      <GridItem lg={candidate?.gridWidthLg} sm={candidate?.gridWidthSm}>
        <FormDatePicker
          fieldId={candidate.name}
          name={candidate.name || ''}
          label={candidate.displayName}
          type={candidate.type}
          infoTitle={candidate.displayName || candidate.name}
          infoText={candidate.description}
          errors={errors}
          touched={touched}
        />
      </GridItem>
    );
  } else if (candidate.allowedValues) {
    return (
      <GridItem lg={candidate?.gridWidthLg} sm={candidate?.gridWidthSm}>
        <FormSelectComponent
          isRequired={candidate.isRequired}
          fieldId={candidate.name}
          name={candidate.name || ''}
          label={candidate.displayName}
          description={candidate.description}
          propertyChange={propertyChange}
          setFieldValue={setFieldValue}
          options={candidate.allowedValues}
          errors={errors}
          touched={touched}
        />
      </GridItem>
    );
  } else {
    return (
      <GridItem lg={candidate?.gridWidthLg} sm={candidate?.gridWidthSm}>
        <ComponentTextInput
          fieldId={candidate.name}
          name={candidate.name || ''}
          label={candidate.displayName}
          type={candidate.type}
          infoTitle={candidate.displayName || candidate.name}
          infoText={candidate.description}
          errors={errors}
          touched={touched}
        />
      </GridItem>
    );
  }
};
