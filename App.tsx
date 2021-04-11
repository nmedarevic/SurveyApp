import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {AppStack} from './Pages';
import reactNativeScreens from 'react-native-screens';

const {enableScreens} = reactNativeScreens;
enableScreens();

import {ThemeProvider} from 'react-native-elements';
const theme = {
  colors: {
    white: '#fff',
  },
};
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppStack />
    </ThemeProvider>
  );
};

export default App;
