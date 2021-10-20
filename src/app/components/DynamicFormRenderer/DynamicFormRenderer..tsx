import React from 'react';
import { Grid, GridItem } from '@patternfly/react-core';
import FormRenderer, { ActionMapper, FormRendererProps } from '@data-driven-forms/react-form-renderer/form-renderer';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import pf4ComponentMapper from '@data-driven-forms/pf4-component-mapper/component-mapper';
import { ComponentMapper, Field } from '@data-driven-forms/react-form-renderer/common-types';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

export type DynamicFormRendererProps = FormRendererProps & {
  componentMapper: ComponentMapper;
  actionMapper: ActionMapper;
};

const ColumnLayout = ({ fields, ...props }) => {
  const { renderForm } = useFormApi();
  const { column } = props;
  const columnSize: any = column && column <= 12 ? 12 / column : 12;

  return (
    <Grid hasGutter xl={columnSize}>
      {fields?.map((field: Field) => (
        <GridItem key={field.name}>{renderForm([field])}</GridItem>
      ))}
    </Grid>
  );
};

const mapperExtension = {
  'column-layout': ColumnLayout,
};

const DynamicFormRenderer: React.FC<any> = ({ componentMapper, initialValues, actionMapper, ...props }) => {
  return (
    <FormRenderer
      FormTemplate={FormTemplate}
      initialValues={initialValues}
      componentMapper={{
        ...pf4ComponentMapper,
        ...mapperExtension,
        ...componentMapper,
      }}
      actionMapper={actionMapper}
      {...props}
    />
  );
};

export { DynamicFormRenderer };
