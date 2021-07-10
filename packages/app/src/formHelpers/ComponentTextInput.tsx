import React, { FunctionComponent } from 'react';
import { useField, FormikErrors, FormikTouched } from 'formik';
import { FormGroup, TextInput } from '@patternfly/react-core';
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
export const ComponentTextInput: FunctionComponent<ComponentTextInputProps> = (props) => {
  const [field] = useField(props);
  const handleKeyPress = (keyEvent: KeyboardEvent) => {
    // disallow entry of "." and "-" for NON-NEG-INT or NON-NEG-LONG or POS-INT
    // disallow entry of "." for INT or LONG
    if (
      ((props.type === 'NON-NEG-INT' || props.type === 'NON-NEG-LONG' || props.type === 'POS-INT') &&
        (keyEvent.key === '.' || keyEvent.key === '-')) ||
      ((props.type === 'INT' || props.type === 'LONG') && keyEvent.key === '.')
    ) {
      keyEvent.preventDefault();
    }
  };
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
      <TextInput
        {...field}
        onChange={(e) => {
          field.onChange(field.name)(e);
        }}
        validated={validated()}
        id={props.name}
        name={props.name}
        aria-describedby={props.name}
        type={
          props.type === 'INT' ||
          props.type === 'LONG' ||
          props.type === 'NON-NEG-INT' ||
          props.type === 'NON-NEG-LONG' ||
          props.type === 'POS-INT'
            ? 'number'
            : props.type === 'PASSWORD'
            ? 'password'
            : 'text'
        }
        onKeyPress={(event) => handleKeyPress(event as any)}
      />
    </FormGroup>
  );
};
