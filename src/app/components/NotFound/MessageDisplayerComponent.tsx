import React, { ComponentType } from 'react';
import {
  Title,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  PageSection
} from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { useHistory } from 'react-router-dom';
import { Maybe } from '@app/models';

interface MessageDisplayerComponentProps {
  mainMessage: Maybe<string> | undefined;
  title: string | null;
  icon: ComponentType<any> | undefined;
}

const MessageDisplayerComponent: React.FunctionComponent<MessageDisplayerComponentProps> = ({ mainMessage, title, icon }) => {
  function GoHomeBtn() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <Button onClick={handleClick}>Take me home</Button>
    );
  }

  return (
    <PageSection>
      <EmptyState>
        <EmptyStateIcon icon={icon} />
        <Title headingLevel="h4" size="lg">
          {title}
        </Title>
        <EmptyStateBody>
          {mainMessage}
        </EmptyStateBody>
        <Button variant="primary">Go to home</Button>
      </EmptyState>
    </PageSection>
  )
};

export { MessageDisplayerComponent };
