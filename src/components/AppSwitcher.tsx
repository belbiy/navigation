import { MenuItem, MenuTrigger, Menu, ActionButton} from '@react-spectrum/s2';
import { useNavigate } from 'react-router-dom';
import { Key } from '@react-types/shared';

import appsAllIcon from '../assets/icons/AppsAll.svg';

const AppSwitcher = ({selectedApp}: {selectedApp: string}) => {
  const navigate = useNavigate();
  
  const apps = [
    { id: 'commerce', name: 'Commerce' },
    { id: 'aem', name: 'Experience Manager' },
    // Add more apps as needed
  ];

  const handleNavigation = (key: Key) => {
    const appId = key.toString();
    navigate(`/${appId}`);
  };

  return <MenuTrigger>
    <ActionButton isQuiet aria-label="App Switcher"><img src={appsAllIcon} alt="App Switcher" /></ActionButton>
        <Menu items={apps} onAction={handleNavigation} selectionMode="single" selectedKeys={[selectedApp]}>
        {(item: { id: string, name: string }) => <MenuItem id={item.id}>{item.name}</MenuItem>}
        </Menu>
    </MenuTrigger>;
};

export default AppSwitcher;

