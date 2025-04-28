import React, { createContext, useContext, useState, ReactNode } from 'react';
import { App } from '../data/apps';

interface AppContextType {
  currentApp: App;
  setCurrentApp: (app: App) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<App>({ id: 'experience-manager', label: 'Adobe Experience Manager' });

  return (
    <AppContext.Provider value={{ currentApp, setCurrentApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 