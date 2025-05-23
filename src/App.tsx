import React from 'react';
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AEMApp from './apps/AEMapp';
import CommerceApp from './apps/CommerceApp';
import { NavigationProvider } from './context/NavigationContext';

const App: React.FC = () => {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <HashRouter>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/commerce" replace />} />
          <Route path="/commerce/*" element={<CommerceApp />} />
          <Route path="/aem/*" element={<AEMApp />} />
        </Routes>
        </NavigationProvider>
      </HashRouter>

    </Provider>
  );
};


export default App