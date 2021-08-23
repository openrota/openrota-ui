import React from 'react';
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { CandidateProfile } from '@app/modules/ResourceManagement/components';

const ResourceManagement: React.FC = () => (
  <PageSection variant={PageSectionVariants.light}>
    {/* <Title headingLevel="h1" size="lg">
      Resource Management
    </Title> */}
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <CandidateProfile />
    </div>
  </PageSection>
);

export default ResourceManagement;
