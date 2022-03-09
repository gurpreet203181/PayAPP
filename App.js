import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { init } from './constants/services/i18n/config';
import Tabs from './navigation/tabs';
import {CardDetail,SignIn,SignUp,Welcome,ForgotPassword,Otp,OnBoarding} from './screens/index'
import AppLoading from 'expo-app-loading';
import { useFonts, Nunito_500Medium ,Nunito_700Bold} from '@expo-google-fonts/nunito';

const Stack = createStackNavigator();

export default function App() {
  init();
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <SafeAreaProvider>
    <NavigationContainer>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"  />

        <Stack.Navigator
        screenOptions={{
          headerShown: false
          
        }}
        initialRouteName={'OnBoarding'}
      >
        <Stack.Screen
          name="Home"
          component={Tabs}
          screenOptions={{
            headerShown:false
          }}
        />

        <Stack.Screen
          name="CardDetail"
          component={CardDetail}
          screenOptions={{
            headerShown:false
          }}
        />
         <Stack.Screen
          name="Welcome"
          component={Welcome}
          screenOptions={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          screenOptions={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          screenOptions={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          screenOptions={{
            headerShown:false
          }}
        />
         <Stack.Screen
          name="Otp"
          component={Otp}
          screenOptions={{
            headerShown:false
          }}
        />
         <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          screenOptions={{
            headerShown:false
          }}
        />
        
       
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
