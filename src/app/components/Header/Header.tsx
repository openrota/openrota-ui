import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Button,
  ButtonVariant,
} from '@patternfly/react-core';
import logo from '@app/images/Logo-Red_Hat-Middleware-A-White-RGB.svg';
import imgAvatar from '@app/images/avatarImg.svg';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
import './Header.css';
import { useAuth } from '@app/context';

export type HeaderProps = {
  isNavOpen: boolean;
  isMobileView: boolean;
  onNavToggleMobile: () => void;
  onNavToggle: () => void;
};

export const Header: React.FC<HeaderProps> = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [isUserToolbarDropdownOpen, setIsUserToolbarDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth?.getUsername().then(userName => setUserName(userName));
  }, []);
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
      <DropdownItem key="my-profile" href="#/profile-management">{t('my_profile')}</DropdownItem>
      <DropdownItem key="user-management" component="button">
        {t('user_management')}
      </DropdownItem>
      <DropdownItem key="logout">{t('logout')}</DropdownItem>
    </DropdownGroup>,
  ];

  const HeaderTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem>
          <Button aria-label="Help actions" variant={ButtonVariant.plain}>
            <HelpIcon />
          </Button>
        </PageHeaderToolsItem>
        <PageHeaderToolsItem
          visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onPageDropdownSelect}
            isOpen={isUserToolbarDropdownOpen}
            toggle={<DropdownToggle onToggle={toggleUserToolbarDropdown}>{userName}</DropdownToggle>}
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
          Home
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#/resource-management">
          Candidate
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} to="#/project-management">
          Projects
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="#/roaster-management">
          Calendar
        </NavItem>
        <NavItem itemId={4} isActive={activeItem === 4} to="#/create-resource-request">
          Create Resource Request
        </NavItem>
        <NavItem itemId={5} isActive={activeItem === 5} to="#/view-resource-requests">
          All resource requests
        </NavItem>
      </NavList>
    </Nav>
  );
  return <PageHeader logo={<LogoImg />} headerTools={HeaderTools} aria-label={'global_navigation'} topNav={PageNav} />;
};

function LogoImg() {
  const history = useHistory();
  function handleClick() {
    history.push('/');
  }
  return <img src={logo} onClick={handleClick} alt="Brand logo" />;
}
