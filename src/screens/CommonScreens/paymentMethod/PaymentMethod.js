import React, { useState } from "react";
import { t } from "../../../hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, icons, SIZES, dummyData } from "../../../constants";
import { Header, PaymentMethodItem } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../../redux/reducers/transferSlice";
import { Button } from "../../../components";

const PaymentMethod = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedCard = useSelector(
    (state) => state.selectedCard.selectedCardId
  ); //getting value of selectedCard from reducer

  const [selectedMethod, setSelectedMethod] = useState("balance");

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
          <PaymentMethodItem
            data={dummyData.paymentMethod[0]}
            label={t("personalAccount")}
            icon={icons.userIcon}
            iconContainerStyle={{ backgroundColor: "#FFBF47" }}
            isSelected={selectedMethod == "balance" ? true : false} // checking if user has selected this method
            onPress={() => setSelectedMethod("balance")} // onPress setting this method on selectedMethod
          />

          {/* my cards */}
          <PaymentMethodItem
            data={dummyData.paymentMethod[0]}
            label={t("myCards")}
            icon={icons.userIcon}
            iconContainerStyle={{ backgroundColor: "#12CDD9" }}
            detail={"**** **** **** " + selectedCard}
            isSelected={selectedMethod == "card" ? true : false}
            onPress={() => {
              setSelectedMethod("card");
              //navigate to selectCard screen where with setSelectCard reducer selcted card is is selected and
              navigation.navigate("SelectCard");
            }}
          />

          {/* bank */}
          <PaymentMethodItem
            data={dummyData.paymentMethod[2]}
            label={t("bankAccount")}
            icon={icons.userIcon}
            iconContainerStyle={{ backgroundColor: "#9471F6" }}
            isSelected={selectedMethod == "bankAccount" ? true : false}
            onPress={() => setSelectedMethod("bankAccount")}
          />
        </View>
      </View>

      <Button
        label={t("continue")}
        containerStyle={styles.continueButton}
        labelStyle={styles.continueButtonLabel}
        onPress={() => {
          const value =
            selectedMethod == "card" && selectedCard
              ? selectedCard
              : selectedMethod;
          dispatch(setPaymentMethod(value));
          navigation.navigate("Confirmation");
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
    ...FONTS.body3,
    color: COLORS.black2,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  continueButton: {
    width: 315,
    height: 64,
    borderRadius: 36,
    backgroundColor: COLORS.purple,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    ...SIZES.marginHorizontal,
  },
  continueButtonLabel: {
    ...FONTS.h3,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.white,
  },
});
