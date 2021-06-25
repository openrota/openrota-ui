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
  DropdownToggle
} from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import logo from './Patternfly-Logo.svg';
import imgAvatar from './avatarImg.svg'

interface IHeader {
  isNavOpen: boolean;
  isMobileView: boolean;
  onNavToggleMobile: () => void;
  onNavToggle: () => void;
}

export const Header: FunctionComponent<IHeader> = ({ isNavOpen, isMobileView, onNavToggleMobile, onNavToggle }) => {
  const { t } = useTranslation();
  const [isUserToolbarDropdownOpen, setIsUserToolbarDropdownOpen] = useState(false);

  const toggleUserToolbarDropdown = (toggle: boolean) => {
    setIsUserToolbarDropdownOpen(toggle)
  };
  const onPageDropdownSelect = () => {
    setIsUserToolbarDropdownOpen(!isUserToolbarDropdownOpen)
  }
  const userDropdownItems = [
    <DropdownGroup key="user">
      <DropdownItem key="my-profile">
        {t('myProfile')}
      </DropdownItem>
      <DropdownItem key="user-management" component="button">
        {t('userManagement')}
      </DropdownItem>
      <DropdownItem key="logout">
        {t('logout')}
      </DropdownItem>
    </DropdownGroup>
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

  return (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      headerTools={HeaderTools}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      aria-label={'global_navigation'}
    />
  )
}

function LogoImg() {
  const history = useHistory();
  function handleClick() {
    history.push('/');
  }
  return <img src={logo} onClick={handleClick} alt="PatternFly Logo" />;
}