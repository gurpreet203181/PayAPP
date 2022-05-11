import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { init } from "./src/hooks/UseI18n";

import RootNavigation from "@navigation";

import AppLoading from "expo-app-loading";
import { useState } from "react";
import { useFonts } from "./src/hooks/useFonts";

//redux configuration
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
//navgiation stack
const Stack = createStackNavigator();

export default function App() {
  // multi language configuration
  init();

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
        <RootNavigation />
        {/* <NavigationContainer>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            //checking if user as viewed onBoarding if not  initialRoute will OnBoarding
            initialRouteName={viewedOnboarding ? "Tabs" : "OnBoarding"}
          >
           

         
     
         
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              screenOptions={{
                headerShown: false,
              }}
            />
         
            

           
           
          </Stack.Navigator>
        </NavigationContainer> */}
      </SafeAreaProvider>
    </Provider>
  );
}
