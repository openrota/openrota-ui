import React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { useGetEmployeesQuery } from '@app/models';

const Dashboard: React.FC = () => {
  const {data, error, loading} = useGetEmployeesQuery();

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        {data?.sharedResource[0]?.firstName} Dashboard
      </Title>
    </PageSection>
  );
};

export { Dashboard };
export default Dashboard;
