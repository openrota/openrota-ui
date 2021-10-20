import React from 'react';
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import {SharedResourceList } from '@app/modules/ResourceManagement/components';

const ResourceManagement: React.FC = () => (
  <PageSection variant={PageSectionVariants.light}>
    <SharedResourceList />
  </PageSection>
);

export default ResourceManagement;
