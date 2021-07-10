import './Layout.css';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { Page } from '@patternfly/react-core';
import { Header } from './Header';
interface IAppLayout {
  children: ReactNode;
}

export const AppLayout: FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = useState(false);

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  return (
    <Page
      mainContainerId="primary-app-container"
      role="main"
      header={
        <Header
          isNavOpen={isNavOpen}
          isMobileView={isMobileView}
          onNavToggleMobile={onNavToggleMobile}
          onNavToggle={onNavToggle}
        />
      }
      onPageResize={onPageResize}
    >
      {children}
    </Page>
  );
};
