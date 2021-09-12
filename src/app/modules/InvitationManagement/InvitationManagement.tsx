import React from 'react';
import { PageSection, Title, PageSectionVariants } from '@patternfly/react-core';
import { InvitationProfile } from '@app/modules/InvitationManagement/components';

const InvitationManagement: React.FC = () => (
  <PageSection variant={PageSectionVariants.light}>
    {/* <Title headingLevel="h1" size="lg">
      Resource Management
    </Title> */}
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <InvitationProfile />
    </div>
  </PageSection>
);

export default InvitationManagement;
