import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isNavigationExpanded: boolean;
  toggleNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavigationExpanded, setIsNavigationExpanded] = useState(true);

  const toggleNavigation = () => {
    setIsNavigationExpanded(!isNavigationExpanded);
  };

  return (
    <NavigationContext.Provider value={{ isNavigationExpanded, toggleNavigation }}>
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