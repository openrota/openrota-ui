import React from 'react';
import Grid from '@mui/material/Grid'
import FormRenderer, { ActionMapper, FormRendererProps } from '@data-driven-forms/react-form-renderer/form-renderer';
import muiComponentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
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
    <Grid container spacing={3}>
      {fields?.map((field: Field) => (
        <Grid item xs key={field.name}>{renderForm([field])}</Grid>
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
        ...muiComponentMapper,
        ...mapperExtension,
        ...componentMapper,
      }}
      actionMapper={actionMapper}
      {...props}
    />
  );
};

export { DynamicFormRenderer };
