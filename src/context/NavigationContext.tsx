import React, { createContext, useContext, useState, ReactNode } from 'react';
import navigationData from '../data/navigation.json';

interface NavigationContextType {
  isExpanded: boolean;
  toggleNavigation: () => void;
  navigationItems: typeof navigationData;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [navigationItems, setNavigationItems] = useState(navigationData);

  const toggleNavigation = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <NavigationContext.Provider value={{ isExpanded, toggleNavigation, navigationItems }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}; 