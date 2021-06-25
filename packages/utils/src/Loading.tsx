import React, { FunctionComponent } from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from '@patternfly/react-core';

export const Loading: FunctionComponent = () => (
  <EmptyState>
    <EmptyStateIcon variant="container" component={Spinner} />
    <Title size="lg" headingLevel="h4">
      Loading
    </Title>
  </EmptyState>
);
