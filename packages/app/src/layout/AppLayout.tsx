import React, { FunctionComponent, ReactNode, useState } from 'react';
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageSidebar,
} from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import { Header } from './Header'
import { useTranslation } from 'react-i18next';

interface IAppLayout {
  children: ReactNode;
}

export const AppLayout: FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = useState(false);
  const { t } = useTranslation();

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  const Navigation = (
    <Nav
      id="nav-primary-simple"
      role="navigation"
      theme="dark"
      aria-label={'global'}
    >
      <NavList id="nav-list-simple">
        <NavItem id={'dashboard'}>
          <NavLink to={'/'} activeClassName="pf-m-current">
            {t('titleDashboard')}
          </NavLink>
        </NavItem>
        <NavItem id={'candidates'}>
          <NavLink to={'/candidate-management'} >
            {t('candidateManagement')}
          </NavLink>
        </NavItem>
        <NavItem id={'project'}>
          <NavLink to={'/project-management'} >
            {t('projectManagement')}
          </NavLink>
        </NavItem>
        <NavItem id={'projects'}>
          <NavLink to={'/projects-calendar'} >
            {t('projectsCalendar')}
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen}
    />
  );

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
      sidebar={Sidebar}
      onPageResize={onPageResize}
    >
      {children}
    </Page>
  );
};