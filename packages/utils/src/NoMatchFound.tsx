import React, { FunctionComponent } from 'react';
import { EmptyState, EmptyStateVariant } from './EmptyState';

type NoMatchFoundProps = {
  onClear?: () => void;
};
export const NoMatchFound: FunctionComponent<NoMatchFoundProps> = ({
  onClear,
}) => (
  <EmptyState
    emptyStateProps={{
      variant: EmptyStateVariant.NoItems,
    }}
    titleProps={{
      title: 'No results found',
    }}
    emptyStateBodyProps={{
      body:
        'No results match the filter criteria. Clear all filters to show results.',
    }}
    buttonProps={
      onClear && {
        title: 'Clear all filters',
        onClick: onClear,
      }
    }
  />
);
