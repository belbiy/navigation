import { Provider, defaultTheme, View, Flex } from '@adobe/react-spectrum'
import Navigation from './components/Navigation'

function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <Flex direction="row" height="100vh">
        <View
          backgroundColor="gray-50"
          width="size-3000"
          height="100%"
          padding="0"
          borderEndWidth="thin"
          borderEndColor="gray-200"
        >
          <Navigation />
        </View>
        <View flex padding="size-200">
          {/* Content area */}
        </View>
      </Flex>
    </Provider>
  )
}

export default App
