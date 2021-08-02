import React from 'react';
import { useQuery } from '@apollo/client';
import { PageSection, Title } from '@patternfly/react-core';
import { getEmployees } from '@app/graphql';

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(getEmployees);

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
