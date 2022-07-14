import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TransactionDetail,
  Transactions,
  PaymentSuccess,
  AddCard,
  CardDetail,
  Transfer,
  PaymentMethod,
  SelectCard,
  TransferConfirmation,
  More,
  TopUpConfirmation,
  TopUp,
  WithDraw,
  WithdrawConfirmation,
  Notification,
  ContactsList,
  ContactUs,
  AccountInfo,
  Activity,
  ForgotPassword,
  PhoneNumber,
  EmailVerfication,
  Otp,
  EditAccount,
  EditProfileImg,
} from "@screens";
import Tabs from "./tabs";
import { firebaseAuth } from "../config/firebase";
const Stack = createStackNavigator();

export default function UserStack() {
  useEffect(() => {
    //reloading firbase user to get update user
    // to check if user is emailVerified
    const reloadUser = async () => {
      await firebaseAuth.currentUser.reload();
    };
    reloadUser();
  }, []);
  const user = firebaseAuth.currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={user.emailVerified ? "Tabs" : "EmailVerfication"}
      >
        {/* Tabs load home and profile screen as tabs */}
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* Home  screens */}
        <Stack.Screen name="CardDetail" component={CardDetail} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="SelectCard" component={SelectCard} />
        <Stack.Screen
          name="TransferConfirmation"
          component={TransferConfirmation}
        />
        <Stack.Screen name="more" component={More} />
        <Stack.Screen name="TopUp" component={TopUp} />
        <Stack.Screen name="TopUpConfirmation" component={TopUpConfirmation} />
        <Stack.Screen name="WithDraw" component={WithDraw} />

        <Stack.Screen
          name="withdrawConfirmation"
          component={WithdrawConfirmation}
        />

        <Stack.Screen name="Notification" component={Notification} />

        {/* Profile  screens */}
        <Stack.Screen name="ContactsList" component={ContactsList} />
        {/* account screen */}
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="EditProfileImg" component={EditProfileImg} />

        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />

        {/* auth screen for user stack */}
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="EmailVerfication" component={EmailVerfication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
