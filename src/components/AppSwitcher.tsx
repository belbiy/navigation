import React from 'react';
import { ActionButton, Menu, MenuTrigger, Item } from '@adobe/react-spectrum';
import appsAllIcon from '../assets/icons/AppsAll.svg';
import { useApp } from '../context/AppContext';
import { apps } from '../data/apps';

const AppSwitcher: React.FC = () => {
  const { currentApp, setCurrentApp } = useApp();

  return (
    <MenuTrigger>
      <ActionButton isQuiet aria-label="App switcher">
        <img src={appsAllIcon} alt="App Switcher" />
      </ActionButton>
      <Menu 
        onAction={(key) => {
          const selectedApp = apps.find(app => app.id === key);
          if (selectedApp) {
            setCurrentApp(selectedApp);
          }
        }}
        selectedKeys={[currentApp.id]}
        selectionMode="single"
      >
        {apps.map(app => (
          <Item key={app.id}>{app.label}</Item>
        ))}
      </Menu>
    </MenuTrigger>
  );
};

export default AppSwitcher; 