import React from 'react';
import { Provider, defaultTheme, View, Flex } from '@adobe/react-spectrum'
import Navigation from './components/Navigation'
import ShellHeader from './components/ShellHeader'
import AppContent from './components/AppContent'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { AppProvider } from './context/AppContext'

const AppContentWrapper: React.FC = () => {
  const { isExpanded } = useNavigation();
  return (
    <Flex direction="column" height="100vh" width="100vw">
      <ShellHeader />
      <Flex direction="row" flex width="100%">
        <View
          width={isExpanded ? "size-3000" : "60px"}
          height="100%"
          padding="0"
          UNSAFE_style={{
            transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Navigation isExpanded={isExpanded} />
        </View>
        <AppContent />
      </Flex>
    </Flex>
  );
};

const App: React.FC = () => {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <AppProvider>
        <NavigationProvider>
          <AppContentWrapper />
        </NavigationProvider>
      </AppProvider>
    </Provider>
  )
}

export default App
