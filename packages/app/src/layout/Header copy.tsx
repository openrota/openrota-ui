import React, { FunctionComponent, useState } from 'react';
import {
  PageHeader,
  PageHeaderTools,
  DropdownGroup,
  DropdownItem,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  Dropdown,
  Avatar,
  DropdownToggle,
  Nav,
  NavList,
  NavItem,
} from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import logo from './Patternfly-Logo.svg';
import imgAvatar from './avatarImg.svg';

interface IHeader {
  isNavOpen: boolean;
  isMobileView: boolean;
  onNavToggleMobile: () => void;
  onNavToggle: () => void;
}

export const Header1: FunctionComponent<IHeader> = ({ isNavOpen, isMobileView, onNavToggleMobile, onNavToggle }) => {
  const { t } = useTranslation();
  const [isUserToolbarDropdownOpen, setIsUserToolbarDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const toggleUserToolbarDropdown = (toggle: boolean) => {
    setIsUserToolbarDropdownOpen(toggle);
  };
  const onPageDropdownSelect = () => {
    setIsUserToolbarDropdownOpen(!isUserToolbarDropdownOpen);
  };
  const onNavSelect = (result: any) => {
    setActiveItem(result.itemId);
  };
  const userDropdownItems = [
    <DropdownGroup key="user">
      <DropdownItem key="my-profile">{t('myProfile')}</DropdownItem>
      <DropdownItem key="user-management" component="button">
        {t('userManagement')}
      </DropdownItem>
      <DropdownItem key="logout">{t('logout')}</DropdownItem>
    </DropdownGroup>,
  ];
  const HeaderTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem
          visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onPageDropdownSelect}
            isOpen={isUserToolbarDropdownOpen}
            toggle={<DropdownToggle onToggle={toggleUserToolbarDropdown}>Developer</DropdownToggle>}
            dropdownItems={userDropdownItems}
          />
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <Avatar src={imgAvatar} alt="Avatar image" />
    </PageHeaderTools>
  );
  const PageNav = (
    <Nav onSelect={onNavSelect} aria-label="Nav" variant="horizontal">
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} to="#">
          System Panel
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#">
          Policy
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} to="#">
          Authentication
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="#">
          Network Services
        </NavItem>
        <NavItem itemId={4} isActive={activeItem === 4} to="#">
          Server
        </NavItem>
      </NavList>
    </Nav>
  );
  return (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      headerTools={HeaderTools}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      aria-label={'global_navigation'}
      topNav={PageNav}
    />
  );
};

function LogoImg() {
  const history = useHistory();
  function handleClick() {
    history.push('/');
  }
  return <img src={logo} onClick={handleClick} alt="PatternFly Logo" />;
}
