import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type NavigationContextType = {
  isNavigationExpanded: boolean;
  setIsNavigationExpanded: (expanded: boolean) => void;
  toggleNavigation: () => void;
};

// Create the context
const NavigationContext = createContext<NavigationContextType | null>(null);

// Create a provider component that accepts navigationData as a prop
interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children 
}) => {
  const parentContext = useContext(NavigationContext);

 
  const [isNavigationExpanded, setIsNavigationExpanded] = useState(
    parentContext?.isNavigationExpanded ?? true
  );

 
  const toggleNavigation = () => {
    setIsNavigationExpanded(prev => !prev);
  };


  
  // Use parent context values or local state
  const contextValue = {
    isNavigationExpanded: parentContext?.isNavigationExpanded ?? isNavigationExpanded,
    setIsNavigationExpanded: parentContext?.setIsNavigationExpanded ?? setIsNavigationExpanded,
    toggleNavigation: parentContext?.toggleNavigation ?? toggleNavigation,
  };


  
  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook to use the navigation context
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};