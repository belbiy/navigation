import React from 'react';
import { Flex, Text, Divider } from '@adobe/react-spectrum';
import { Avatar, ActionButtonGroup, ActionButton } from '@react-spectrum/s2';
import adobeLogo from '../assets/adobe-logo.svg';
import menuHamburgerIcon from '../assets/icons/MenuHamburger.svg';
import aiChatIcon from '../assets/icons/AIChat.svg';
import helpCircleIcon from '../assets/icons/HelpCircle.svg';
import bellIcon from '../assets/icons/Bell.svg';
import AppSwitcher from './AppSwitcher';
import { useNavigationContext } from '../context/NavigationContext';


interface ShellHeaderProps {
  currentApp: string;
  currentAppName: string;
}

const ShellHeader: React.FC<ShellHeaderProps> = ({ currentApp, currentAppName }) => {
   
  const { toggleNavigation } = useNavigationContext();
 
  return (
    <>
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
        <Flex alignItems="center" gap="size-100">
          <ActionButton isQuiet size='M' aria-label="Open menu"  onPress={toggleNavigation}>
            <img src={menuHamburgerIcon} alt="Menu" style={{ width: 20, height: 20 }} />
          </ActionButton>
          <img src={adobeLogo} alt="Adobe Logo" style={{ width: 32, height: 32 }} />
          <Text UNSAFE_style={{ fontWeight: 600, fontSize: 16 }}>
            { currentAppName }
          </Text>
        </Flex>
        {/* Right: Company, Icons */}
        <Flex alignItems="center" gap="size-200">
          <Text UNSAFE_style={{ color: '#444', fontSize: 14, marginRight: 24 }}>
            Company, Inc
          </Text>
          <Divider orientation="vertical" UNSAFE_style={{ backgroundColor: '#e1e1e6', width: 1, height: 28, marginRight: 0 }} />
          <ActionButtonGroup
            isQuiet
            aria-label="Header actions"
            size='M'
          >
            <ActionButton key="assistant" aria-label="Assistant">
              <img src={aiChatIcon} alt="Assistant" />
            </ActionButton>
            <ActionButton key="help" aria-label="Help">
              <img src={helpCircleIcon} alt="Help" />
            </ActionButton>
            <ActionButton key="notifications" aria-label="Notifications">
              <img src={bellIcon} alt="Notifications" />
            </ActionButton>
           
             
            <AppSwitcher selectedApp={currentApp} />
          
            <ActionButton key="user-profile" aria-label="User profile">
              <Avatar 
                src="https://i.imgur.com/xIe7Wlb.png"
                alt="User profile" 
                size={24}
                UNSAFE_style={{ backgroundColor: '#1473e6' }}
                
              />
            </ActionButton>
          </ActionButtonGroup>
          
        </Flex>
      </Flex>
    </>
  );
};

export default ShellHeader; 