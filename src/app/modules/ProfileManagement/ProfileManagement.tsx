import React from 'react';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { CandidateProfile } from '@app/modules/ProfileManagement/components';

const ProfileManagement: React.FC = () => (
  <PageSection variant={PageSectionVariants.light}>
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <CandidateProfile />
    </div>
  </PageSection>
);

export default ProfileManagement;
