import React from 'react';
import { Flex, Text, ActionButton, Divider, ActionGroup, Item } from '@adobe/react-spectrum';
import adobeLogo from '../assets/adobe-logo.svg';
import menuHamburgerIcon from '../assets/icons/MenuHamburger.svg';
import aiChatIcon from '../assets/icons/AIChat.svg';
import helpCircleIcon from '../assets/icons/HelpCircle.svg';
import bellIcon from '../assets/icons/Bell.svg';
import { useNavigation } from '../context/NavigationContext';
import { useApp } from '../context/AppContext';
import AppSwitcher from './AppSwitcher';

// Global CSS fix to center icons within ActionGroup Item components
const globalStyles = `
  .spectrum-ActionGroup-item {
    padding-inline-end: 0 !important;
  }
`;

const ShellHeader: React.FC = () => {
  const { toggleNavigation } = useNavigation();
  const { currentApp } = useApp();

  return (
    <>
      <style>{globalStyles}</style>
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        UNSAFE_style={{
          height: '48px',
          padding: '0 16px',
          minWidth: 0,
          zIndex: 10,
          position: 'relative',
        }}
      >
        {/* Left: Menu + Logo + Title */}
        <Flex alignItems="center" gap="size-200">
          <ActionButton aria-label="Open menu" UNSAFE_style={{ marginRight: 8 }} isQuiet onPress={toggleNavigation}>
            <img src={menuHamburgerIcon} alt="Menu" style={{ width: 24, height: 24 }} />
          </ActionButton>
          <img src={adobeLogo} alt="Adobe Logo" style={{ width: 32, height: 32, borderRadius: 6, background: '#fff' }} />
          <Text UNSAFE_style={{ fontWeight: 600, fontSize: 16 }}>
            {currentApp.label}
          </Text>
        </Flex>
        {/* Right: Company, Icons */}
        <Flex alignItems="center" gap="size-200">
          <Text UNSAFE_style={{ color: '#444', fontSize: 14, marginRight: 24 }}>
            Company, Inc
          </Text>
          <Divider orientation="vertical" UNSAFE_style={{ backgroundColor: '#e1e1e6', width: 1, height: 28, marginRight: 0 }} />
          <ActionGroup
            isQuiet
            buttonLabelBehavior="hide"
            overflowMode="collapse"
            aria-label="Header actions"
          >
            <Item key="user-profile" aria-label="Assistant">
              <img src={aiChatIcon} alt="Assistant" />
            </Item>
            <Item key="help" aria-label="Help">
              <img src={helpCircleIcon} alt="Help" />
            </Item>
            <Item key="notifications" aria-label="Notifications">
              <img src={bellIcon} alt="Notifications" />
            </Item>
          </ActionGroup>
          <AppSwitcher />
        </Flex>
      </Flex>
    </>
  );
};

export default ShellHeader; 