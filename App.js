import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { init } from "./src/hooks/UseI18n";
import Tabs from "./src/navigation/tabs";
import {
  CardDetail,
  SignIn,
  SignUp,
  Welcome,
  ForgotPassword,
  Otp,
  OnBoarding,
  TransactionDetail,
  Transactions,
  PaymentSuccess,
  AddCard,
  Transfer,
  PaymentMethod,
  SelectCard,
  More,
  TransferConfirmation,
  TopUp,
  TopUpConfirmation,
  WithDraw,
  WithdrawConfirmation,
  Notification,
} from "./src/screens/index";
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
        <NavigationContainer>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            //checking if user as viewed onBoarding if not  initialRoute will OnBoarding
            initialRouteName={viewedOnboarding ? "Tabs" : "OnBoarding"}
          >
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CardDetail"
              component={CardDetail}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TransactionDetail"
              component={TransactionDetail}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Transactions"
              component={Transactions}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccess}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="AddCard"
              component={AddCard}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Transfer"
              component={Transfer}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="PaymentMethod"
              component={PaymentMethod}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="SelectCard"
              component={SelectCard}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TransferConfirmation"
              component={TransferConfirmation}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="more"
              component={More}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TopUp"
              component={TopUp}
              screenOptions={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TopUpConfirmation"
              component={TopUpConfirmation}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="WithDraw"
              component={WithDraw}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="withdrawConfirmation"
              component={WithdrawConfirmation}
              screenOptions={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Notification"
              component={Notification}
              screenOptions={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
