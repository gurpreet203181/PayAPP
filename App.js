import { StyleSheet, Text, View,Platform,StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { init } from './constants/services/i18n/config';
import Tabs from './navigation/tabs';
const Stack = createStackNavigator();

export default function App() {
  init();

  return (
    
    <SafeAreaProvider>
    <NavigationContainer>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"  />

        <Stack.Navigator
        screenOptions={{
          headerShown: false
          
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen
          name="Home"
          component={Tabs}
          screenOptions={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
