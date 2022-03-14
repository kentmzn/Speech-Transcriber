import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { LogBox } from 'react-native'

import AppNavigator from './src/navigators/app.navigator'
import theme from './src/theme'

const App = () => {
  LogBox.ignoreLogs([
    'NativeEventEmitter',
    'Remote debugger is in a background tab which may cause apps to perform slowly.',
  ])

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App
