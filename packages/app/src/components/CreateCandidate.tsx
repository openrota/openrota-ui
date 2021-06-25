import React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Title,

} from '@patternfly/react-core';
import { Formik } from "formik";
// import * as Yup from "yup";
import { useTranslation } from 'react-i18next';


export const CreateCandidate = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Title headingLevel="h1">{t('createCandidate')}</Title>
          <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
        </TextContent>

      </PageSection>
      <PageSection isFilled>
        <div>
          <h1>My Form</h1>
          <Formik
            initialValues={{ name: 'jared' }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log(values)
                // alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  name="name"
                />
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        </div>
      </PageSection>
    </>
  )
}