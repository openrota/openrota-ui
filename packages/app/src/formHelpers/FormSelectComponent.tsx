import { FormGroup, Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { useField, FormikErrors, FormikTouched } from 'formik';
import * as React from 'react';
import { HelpInfoIcon } from './HelpInfoIcon';

export interface ISelectOptions {
  value: string;
  disabled: boolean;
}
export interface IFormSelectComponentProps {
  label: string;
  name: string;
  description: string;
  fieldId: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  isRequired: boolean;
  options: string[];
  propertyChange: (name: string, selection: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export const FormSelectComponent = (props: IFormSelectComponentProps) => {
  const { label, description, fieldId, errors, options, propertyChange, setFieldValue } = props;

  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [field] = useField(props);

  const onToggle = (open: boolean) => {
    setOpen(open);
  };

  const clearSelection = () => {
    setOpen(false);
  };

  const onSelect = React.useCallback((_: any, selection: any, isPlaceholder: any) => {
    if (isPlaceholder) {
      clearSelection();
    } else {
      setOpen(false);
      setFieldValue(field.name, selection);
      propertyChange(field.name, selection);
    }
  }, []);

  const selectOptions = options.map((value: any) => {
    return { value: value };
  });

  return (
    <FormGroup
      label={label}
      labelIcon={<HelpInfoIcon label={label} description={description} />}
      helperTextInvalid={errors[props.name]}
      helperTextInvalidIcon={<ExclamationCircleIcon />}
      fieldId={field.name}
      name={fieldId}
    >
      <Select
        variant={SelectVariant.single}
        aria-label="Select Input"
        onToggle={onToggle}
        onSelect={onSelect}
        selections={field.value}
        isOpen={isOpen}
      >
        {selectOptions.map((option: any, index) => {
          return <SelectOption key={index} value={option.value} isPlaceholder={option.isPlaceholder} />;
        })}
      </Select>
    </FormGroup>
  );
};
