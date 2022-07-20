import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { init } from "./src/hooks/UseI18n";

import RootNavigation from "@navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { useFonts } from "./src/hooks/useFonts";

//redux configuration
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { OnBoarding } from "@screens";
import { notification } from "src/config/firebase";
import { utils } from "src/utils";
import FlashMessage from "react-native-flash-message";

//navgiation stack
const Stack = createStackNavigator();

export default function App() {
  // multi language configuration
  init();

  // Register background handler
  notification.setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    utils.setNotificationsAsyncStorage(remoteMessage);
  });

  const Stack = createStackNavigator();

  const [IsReady, SetIsReady] = useState(false);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  //checking if user viewed onBoarding
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Errore @checkOnboarding:", error);
    }
  };

  //loading font and onBoarding function
  const LoadAsyncAndRestoreToken = async () => {
    await useFonts();
    await checkOnboarding();
  };

  //checking if custom font is loaded and laoding is false if not then retrun apploading
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadAsyncAndRestoreToken}
        onFinish={() => SetIsReady(true)}
        onError={() => {
          console.log("Font or Onborading loading error");
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <FlashMessage position="top" />
        {viewedOnboarding ? (
          <RootNavigation />
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
                //setting viewedOnboarding value to true from onborading last slide button
                initialParams={{ setViewedOnboarding: setViewedOnboarding }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </Provider>
  );
}
