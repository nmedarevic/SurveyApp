import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from './Home/Home';
import {SurveyList} from './SurveyList/SurveyList';
import {Survey} from './Survey/Survey';
import {DatabaseProvider} from '../database/databaseContext';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <NavigationContainer>
      <DatabaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Welcome to Survey app'}}
          />
          <Stack.Screen name="SurveyList" component={SurveyList} />
          <Stack.Screen name="Survey" component={Survey} />
        </Stack.Navigator>
      </DatabaseProvider>
    </NavigationContainer>
  );
};
