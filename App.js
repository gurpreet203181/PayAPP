import { StyleSheet, Text, View,Platform,StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
const Stack = createStackNavigator();

export default function App() {
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
