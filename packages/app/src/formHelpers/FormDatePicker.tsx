import React, { FunctionComponent } from 'react';
import { DatePicker, FormGroup } from '@patternfly/react-core';
import { useField, FormikErrors, FormikTouched } from 'formik';
import { HelpInfoIcon } from './HelpInfoIcon';

export interface ComponentTextInputProps {
  label: string;
  infoText: string | '';
  fieldId: string;
  name: string;
  infoTitle: string | '';
  helperTextInvalid?: any;
  type: any;
  validated?: 'default' | 'success' | 'warning' | 'error' | undefined;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
}
export const FormDatePicker: FunctionComponent<ComponentTextInputProps> = (props) => {
  const [field] = useField(props);
  const validated = () => {
    return props.errors[props.name] && props.touched[props.name] ? 'error' : 'default';
  };

  return (
    <FormGroup
      label={props.label}
      labelIcon={<HelpInfoIcon label={props.label} description={props.infoText} />}
      validated={validated()}
      fieldId={props.name}
      helperTextInvalid={props.errors[props.name]}
    >
      <DatePicker
        {...field}
        onChange={(e) => {
          field.onChange(field.name)(e);
        }}
      />
    </FormGroup>
  );
};
