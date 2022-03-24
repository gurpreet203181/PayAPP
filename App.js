import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { init } from './hooks/UseI18n';
import Tabs from './navigation/tabs';
import {CardDetail,SignIn,SignUp,Welcome,ForgotPassword,Otp,OnBoarding, Home} from './screens/index'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';


//navgiation stack
const Stack = createStackNavigator();

export default function App() {

  // multi language configuration
  init();
  
  //custom fonts
  let [fontsLoaded] = useFonts({
    'Poppins-light': require('./assets/fonts/Poppins-Light.ttf')
   
  });

   const [loading, setLoading] = useState(true);
   const [viewedOnboarding, setViewedOnboarding] = useState(false);
   
   //checking if user viewed onBoarding 
   const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if(value !== null) {
        setViewedOnboarding(true);
      }
  
    }catch (error) {
      console.log('Errore @checkOnboarding:', error)
    }finally{
      setLoading(false);
    }
  
  }
  
  useEffect(()=>{
    checkOnboarding();
  
  },[]);
 //checking if custom font is loaded and laoding is false if not then retrun apploading
 if (!fontsLoaded || loading ) {
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
        //checking if user as viewed onBoarding if not  initialRoute will OnBoarding 
        initialRouteName={viewedOnboarding? 'Welcome':'OnBoarding'}
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
