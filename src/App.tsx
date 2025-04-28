import React from 'react';
import { Provider, defaultTheme, View, Flex } from '@adobe/react-spectrum'
import Navigation from './components/Navigation'
import ShellHeader from './components/ShellHeader'
import { NavigationProvider, useNavigation } from './context/NavigationContext'

const AppContent: React.FC = () => {
  const { isNavigationExpanded } = useNavigation();
  return (
    <Flex direction="column" height="100vh" width="100vw">
      <ShellHeader />
      <Flex direction="row" flex width="100%">
        <View
          width="size-3000"
          height="100%"
          padding="0"
        >
          <Navigation isExpanded={isNavigationExpanded} />
        </View>
        <View flex padding="size-200">
          {/* Content area */}
        </View>
      </Flex>
    </Flex>
  );
};

const App: React.FC = () => {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </Provider>
  )
}

export default App
