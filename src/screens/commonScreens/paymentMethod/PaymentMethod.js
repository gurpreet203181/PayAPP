import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, icons, SIZES, dummyData } from "@constants";
import { Header, PaymentMethodItem, Button } from "@components";
import { useDispatch, useSelector } from "react-redux";
//import { setPaymentMethod } from "@redux/reducers/transferSlice";
import { setPaymentMethodName } from "@redux/reducers/paymentMethodSlice";
/*summery
PaymentMethod is screen to select method which payment method user want to use 
for service selected. 

PaymentMethod offer 3 service to pay with : balance , card(add by user) and bank account 
defualt is balance.

After click on option, method name is saved in state and on press Continue button state value
is saved in paymentMethodslice redux paymentMethod object name's property .
if user click on card or bank options, it will navigate to select card screen and where user will select a card
and save it's value on paymentmethod object number property in redux paymentmethod 

TO USE SCREEN : 
prop:nextScreen
prop need to navigate next screen on press of continue button 
or by default it will navigate back to previous screen 

prop:disableMethod
props nedd to diasable specifice payment method 


*/
const PaymentMethod = ({ navigation, route }) => {
  const nextScreen = route.params?.nextScreen; //getting next screen name has param from previous screen
  const disableMethod = route.params?.disableMethod; //getting if any payment method as disable

  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState("balance"); //default payment method

  const selectedCard = useSelector(
    (state) => state.paymentMethod.paymentMethodDetail.id
  ); //getting value of selectedCard from reducer

  //method which set state to redux on continue button press
  const setStates = () => {
    dispatch(setPaymentMethodName(selectedMethod));
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("paymentMethod")}
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      {/* Header */}
      {renderHeader()}

      <View style={styles.PaymentContainer}>
        <Text style={styles.ChooseText}>{t("choosePaymentMethod")}</Text>

        <View style={{ marginTop: 15 }}>
          {/* myBalance Method */}
          {disableMethod != "balance" && (
            <PaymentMethodItem
              label={t("personalAccount")}
              icon={icons.userIcon}
              iconContainerStyle={{ backgroundColor: "#FFBF47" }}
              isSelected={selectedMethod == "balance" ? true : false} // checking if user has selected this method
              onPress={() => setSelectedMethod("balance")} // onPress setting this method on selectedMethod
            />
          )}

          {/* my cards */}
          {disableMethod != "card" && (
            <PaymentMethodItem
              label={t("myCards")}
              icon={icons.userIcon}
              iconContainerStyle={{ backgroundColor: "#12CDD9" }}
              detail={
                selectedMethod == "card"
                  ? "**** **** **** " + selectedCard
                  : null
              }
              isSelected={selectedMethod == "card" ? true : false}
              onPress={() => {
                setSelectedMethod("card");
                //navigate to selectCard screen where with setSelectCard reducer selcted card is is selected and
                navigation.navigate("SelectCard");
              }}
            />
          )}

          {/* bank */}
          {disableMethod != "bankAccount" && (
            <PaymentMethodItem
              label={t("bankAccount")}
              icon={icons.userIcon}
              iconContainerStyle={{ backgroundColor: "#9471F6" }}
              isSelected={selectedMethod == "bankAccount" ? true : false}
              onPress={() => setSelectedMethod("bankAccount")}
            />
          )}
        </View>
      </View>

      <Button
        label={t("continue")}
        containerStyle={styles.continueButton}
        labelStyle={styles.continueButtonLabel}
        onPress={() => {
          setStates();
          //checking previous screen has passed nextScreen param else on press goback
          nextScreen ? navigation.navigate(nextScreen) : navigation.goBack();
        }}
      />
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  PaymentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
  },
  ChooseText: {
    ...FONTS.h4,
    color: COLORS.darkBlue3,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  continueButton: {
    width: 327,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.darkBlue3,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    ...SIZES.marginHorizontal,
  },
  continueButtonLabel: {
    ...FONTS.h4,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.white,
  },
});
