import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Title,
  Grid,
  GridItem,
  Button,
} from '@patternfly/react-core';
import { Form, Formik } from 'formik';
// import { AxiosResponse } from 'axios'; // TODO
// import { Configuration, CandidatesApi, Candidate } from '@openrota/api'; // TODO
import * as Yup from 'yup'; // TODO
import { FormComponent } from '../formHelpers';
import { useTranslation } from 'react-i18next';
import { getFormattedProperties } from '../Utils';

// TODO
// const fetchConnectorTypes = (
//   accessToken: () => Promise<string>,
//   basePath: string
// ): Promise<AxiosResponse<Candidate>> => {
//   const apisService = new CandidatesApi(
//     new Configuration({
//       accessToken,
//       basePath,
//     })
//   );
//   return apisService.createCandidate();
// };
export interface CandidatesInput {
  category: string;
  description: string;
  displayName: string;
  isRequired: boolean;
  name: string;
  type: string;
}
interface CandidatesSchema {
  [key: string]: any;
}

const candidatesFormDefinition = [
  {
    category: 'GENERAL',
    description:
      'Unique name that identifies the database server and all recorded offsets, and that is used as a prefix for all schemas and topics. Each distinct installation should have a separate namespace and be monitored by at most one Debezium connector.',
    displayName: 'Name',
    isRequired: true,
    name: 'name',
    type: 'string',
  },
  {
    category: 'GENERAL',
    description: 'Resolvable hostname or IP address of the database server.',
    displayName: 'Experience',
    isRequired: true,
    name: 'experience',
    type: 'string',
  },
  {
    category: 'GENERAL',
    description: 'Date of availability of the candidate',
    displayName: 'Date of availability',
    isRequired: true,
    name: 'DateOfAvailability',
    type: 'picker',
  },
  {
    category: 'GENERAL',
    description: 'Name of the database user to be used when connecting to the database.',
    displayName: 'Skill',
    isRequired: true,
    name: 'skill',
    type: 'string',
    defaultValue: 'precise',
    allowedValues: ['precise', 'string', 'double'],
  },
  {
    category: 'GENERAL',
    description: 'Status',
    displayName: 'Status',
    defaultValue: true,
    isRequired: false,
    name: 'status',
    type: 'boolean-switch',
  },
  {
    category: 'GENERAL',
    description: 'Checkbox example',
    displayName: 'Checkbox example',
    defaultValue: true,
    isRequired: false,
    name: 'featured',
    type: 'boolean',
  },
  {
    category: 'GENERAL',
    description: 'Name of the database user to be used when connecting to the database.',
    displayName: 'Skill',
    isRequired: true,
    name: 'skill',
    type: 'string',
    defaultValue: 'precise',
    allowedValues: ['precise', 'string', 'double'],
  },
];
const formattedPropertyDef = getFormattedProperties(candidatesFormDefinition, 'candidates');
console.log(formattedPropertyDef);

export const CreateCandidate: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const handleSubmit = (values: any, actions: any) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
    }, 1000);
    actions.setSubmitting(false);
  };

  const candidatesSchema: CandidatesSchema = {};
  const candidatesInitialValue: CandidatesSchema = {};

  formattedPropertyDef.map((key: any) => {
    if (key.type === 'string') {
      candidatesSchema[key.name] = Yup.string();
    } else if (key.type === 'filters') {
      candidatesSchema[key.name] = Yup.string();
    } else if (key.type === 'picker') {
      candidatesSchema[key.name] = Yup.string();
    }
    if (key.isRequired) {
      candidatesSchema[key.name] = candidatesSchema[key.name].required(`${key.displayName} ${t('isRequired')}`);
    }
    candidatesInitialValue[key.name] = key.defaultValue === undefined ? '' : key.defaultValue;
  });

  const validationSchema = Yup.object().shape({ ...candidatesSchema });

  const propertyChange = (name: any, selection: any) => {
    Object.entries(candidatesInitialValue).forEach(([key]) => {
      if (key === name) {
        candidatesInitialValue[selection] = selection;
      }
    });
    return candidatesInitialValue;
  };
  console.log('candidatesInitialValue', candidatesInitialValue);

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Title headingLevel="h1">{t('createCandidate')}</Title>
          <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
        </TextContent>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} isFilled>
        <Formik
          initialValues={candidatesInitialValue}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="pf-c-form">
              <Grid hasGutter={true} className={'data-options-component-expansion-content'}>
                {candidatesFormDefinition.map((candidate, index) => (
                  <FormComponent
                    setFieldValue={setFieldValue}
                    errors={errors}
                    candidate={candidate}
                    propertyChange={propertyChange}
                    key={index}
                    touched={touched}
                  />
                ))}
                <Grid hasGutter={true}>
                  <GridItem lg={6}>
                    <Button variant="primary" type="submit" isLarge>
                      Submit
                    </Button>{' '}
                    <Button variant="secondary" isLarge>
                      Cancel
                    </Button>
                  </GridItem>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </PageSection>
    </>
  );
};
