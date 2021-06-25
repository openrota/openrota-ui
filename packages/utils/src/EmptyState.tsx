import React, { FunctionComponent } from 'react';
import {
  Title,
  Button,
  EmptyState as PFEmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  TitleSizes,
  TitleProps,
  ButtonProps,
  EmptyStateIconProps,
  EmptyStateProps as PFEmptyStateProps,
  EmptyStateBodyProps,
  ButtonVariant,
  EmptyStateVariant as PFEmptyStateVariant,
} from '@patternfly/react-core';
import PlusCircleIcon from '@patternfly/react-icons/dist/js/icons/plus-circle-icon';
import SpaceShuttleIcon from '@patternfly/react-icons/dist/js/icons/space-shuttle-icon';
import LockIcon from '@patternfly/react-icons/dist/js/icons/lock-icon';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import { css } from '@patternfly/react-styles';
import { NotFoundImg } from './NotFoundImg';

export enum EmptyStateVariant {
  GettingStarted = 'GettingStarted',
  NoAccess = 'NoAccess',
  NoResult = 'NoResult',
  NoItems = 'NoItems',
  UnexpectedError = 'UnexpectedError',
  PageNotFound = 'PageNotFound',
}

type EmptyStateProps = {
  titleProps?: Omit<TitleProps, 'children' | 'headingLevel'> & {
    headingLevel?: string;
  };
  emptyStateProps?: Omit<PFEmptyStateProps, 'children' | 'variant'> & {
    variant?: EmptyStateVariant | PFEmptyStateVariant;
  };
  emptyStateIconProps?: EmptyStateIconProps;
  emptyStateBodyProps?: Omit<EmptyStateBodyProps, 'children'> & {
    body?: string | React.ReactNode;
  };
  buttonProps?: Omit<ButtonProps, 'children'> & {
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    'data-testid'?: string;
  };
  children?: React.ReactNode;
};

export const EmptyState: FunctionComponent<EmptyStateProps> = ({
  titleProps,
  buttonProps,
  emptyStateIconProps,
  emptyStateProps,
  emptyStateBodyProps,
  children,
}: EmptyStateProps) => {
  const {
    variant: buttonVariant = ButtonVariant.primary,
    onClick,
    ...restButtonProps
  } = buttonProps || {};
  const { title, ...restTitleProps } = titleProps || {};
  const { body, ...restEmptyStateBodyProps } = emptyStateBodyProps || {};
  const {
    variant: emptyStateVariant = EmptyStateVariant.GettingStarted,
    className,
    ...restEmptyStateProps
  } = emptyStateProps || {};

  const { variant, icon, titleSize, headingLevel } = getVariantConfig({
    variant: emptyStateVariant,
    emptyStateIconProps,
    titleProps,
  });

  return (
    <PFEmptyState
      variant={variant}
      className={css('pf-u-pt-2xl pf-u-pt-3xl-on-md', className)}
      {...restEmptyStateProps}
    >
      <EmptyStateIcon icon={icon} {...emptyStateIconProps} />
      {title && (
        <Title headingLevel={headingLevel} size={titleSize} {...restTitleProps}>
          {title}
        </Title>
      )}
      {body && (
        <EmptyStateBody {...restEmptyStateBodyProps}>{body}</EmptyStateBody>
      )}
      {buttonProps?.title && (
        <Button variant={buttonVariant} onClick={onClick} {...restButtonProps}>
          {buttonProps?.title}
        </Button>
      )}
      {children}
    </PFEmptyState>
  );
};

type GetVariantConfigProps = {
  variant?: EmptyStateVariant | PFEmptyStateVariant;
  emptyStateIconProps?: EmptyStateIconProps;
  titleProps?: Omit<TitleProps, 'children' | 'headingLevel'> & {
    headingLevel?: string;
  };
};
const getVariantConfig = ({
  variant,
  emptyStateIconProps,
  titleProps,
}: GetVariantConfigProps) => {
  let varaintConfig: any = {};
  switch (variant) {
    case EmptyStateVariant.GettingStarted:
      varaintConfig = {
        variant: PFEmptyStateVariant.xl,
        icon: SpaceShuttleIcon,
        titleSize: TitleSizes['4xl'],
        headingLevel: 'h1',
      };
      break;
    case EmptyStateVariant.NoAccess:
      varaintConfig = {
        variant: PFEmptyStateVariant.large,
        icon: LockIcon,
        titleSize: TitleSizes.xl,
        headingLevel: 'h2',
      };
      break;
    case EmptyStateVariant.NoItems:
      varaintConfig = {
        variant: PFEmptyStateVariant.large,
        icon: PlusCircleIcon,
        titleSize: TitleSizes.xl,
        headingLevel: 'h2',
      };
      break;
    case EmptyStateVariant.NoResult:
      varaintConfig = {
        variant: PFEmptyStateVariant.large,
        icon: SearchIcon,
        titleSize: TitleSizes.lg,
        headingLevel: 'h2',
      };
      break;
    case EmptyStateVariant.UnexpectedError:
      varaintConfig = {
        variant: PFEmptyStateVariant.full,
        icon: ExclamationCircleIcon,
        titleSize: TitleSizes.lg,
        headingLevel: 'h1',
      };
      break;
    case EmptyStateVariant.PageNotFound:
      varaintConfig = {
        variant: PFEmptyStateVariant.full,
        icon: NotFoundImg,
        titleSize: TitleSizes.lg,
        headingLevel: 'h1',
      };
      break;
    default:
      varaintConfig = {
        variant: variant || PFEmptyStateVariant.full,
        icon: emptyStateIconProps?.icon,
        titleSize: titleProps?.size,
        headingLevel: titleProps?.headingLevel,
      };
      break;
  }
  return varaintConfig;
};
