import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, icons, FONTS, SIZES } from "@constants";
import { Header, Button } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { setTopUpAmount } from "@redux/reducers/topUpSlice";
import VirtualKeyboard from "react-native-virtual-keyboard";

import { showMessage } from "react-native-flash-message";
import { utils } from "src/utils";
const TopUp = ({ navigation }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("0");
  const [selectedMethod, setSelectedMethod] = useState("bankAccount");
  const [selectedAmountButton, setselectedAmountButton] = useState();

  const selectedCard = useSelector(
    (state) => state.paymentMethod.paymentMethodDetail.id
  );

  const amountButton = (amount, id) => {
    setselectedAmountButton(id);
    setAmount(amount);
  };
  //function to check amount valid and contact is selected
  function isValid() {
    if (amount <= 0) {
      showMessage({
        message: "Amount not vaild",
        // description: "Amount not vaild",
        type: "danger",
      });
      return false;
    }
    return true;
  }
  const onContinuePress = async () => {
    if (isValid()) {
      const formattedAmount = utils.ammountFormat(amount, "EUR");
      dispatch(setTopUpAmount(formattedAmount));

      //navigation to paymentMethod screen with nextscreen name as prop
      navigation.navigate("TopUpConfirmation");
    }
  };
  //render
  function renderHeader() {
    return (
      <Header
        title={t("topUp")}
        leftIcon={icons.close}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderAmount() {
    return (
      <View style={styles.boxStyle}>
        <View style={styles.boxRow}>
          <Text style={styles.boxText}>{t("enterAmount")}</Text>
          <Text adjustsFontSizeToFit lineHeight={1} style={styles.boxText}>
            {t("topUpFee")} €0
          </Text>
        </View>

        <View style={{ ...styles.boxRow, justifyContent: "flex-start" }}>
          <Text style={{ ...styles.boxText, fontSize: 16 }}>EUR</Text>
          <Text
            adjustsFontSizeToFit
            lineHeight={1}
            style={{ ...styles.amount }}
          >
            {amount}
          </Text>
        </View>
      </View>
    );
  }
  function rednerButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 327,
          marginTop: 27,
          ...SIZES.marginHorizontal,
        }}
      >
        <Button
          label={"$150.00"}
          labelStyle={{
            ...styles.amountButtonText,
            color: selectedAmountButton == 1 ? COLORS.white : COLORS.darkBlue3,
          }}
          containerStyle={{
            ...styles.amountButton,
            backgroundColor: selectedAmountButton == 1 ? "#1DAB87" : "#F9FAFB",
          }}
          onPress={() => amountButton("150.00", 1)}
        />
        <Button
          label={"$200.00"}
          labelStyle={{
            ...styles.amountButtonText,
            color: selectedAmountButton == 2 ? COLORS.white : COLORS.darkBlue3,
          }}
          containerStyle={{
            ...styles.amountButton,
            backgroundColor: selectedAmountButton == 2 ? "#1DAB87" : "#F9FAFB",
          }}
          onPress={() => amountButton("200.00", 2)}
        />
        <Button
          label={"$400.00"}
          labelStyle={{
            ...styles.amountButtonText,
            color: selectedAmountButton == 3 ? COLORS.white : COLORS.darkBlue3,
          }}
          containerStyle={{
            ...styles.amountButton,
            backgroundColor: selectedAmountButton == 3 ? "#1DAB87" : "#F9FAFB",
          }}
          onPress={() => amountButton("400.00", 3)}
        />
      </View>
    );
  }
  function renderKeyboard_Text() {
    return (
      <View style={{ ...styles.keyboard, flex: 0.6 }}>
        {/* <Text numberOfLines={1} adjustsFontSizeToFit style={styles.amount}>
          {amount}
        </Text> */}

        <VirtualKeyboard
          color="#9494AD"
          decimal={true}
          pressMode="string"
          clearOnLongPress={true}
          rowStyle={{ height: 80 }}
          // cellStyle={{width:125}}
          onPress={(val) => {
            setselectedAmountButton(null);
            setAmount(val ? val : 0);
          }}
        />
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      {/* Header */}
      {renderHeader()}
      <View style={{ flex: 0.25 }}>
        {/* Select PaymentMethod */}
        {renderAmount()}

        {/* amount Buttons */}
        {rednerButtons()}
      </View>

      {/* render virtual keyboard  and text  */}
      {renderKeyboard_Text()}
      <View
        style={{
          flex: 0.1,
        }}
      >
        <Button
          label={t("continue")}
          containerStyle={styles.continueButton}
          labelStyle={styles.continueButtonLabel}
          onPress={onContinuePress}
        />
      </View>
    </View>
  );
};
export default TopUp;

const styles = StyleSheet.create({
  ChooseText: {
    ...FONTS.body3,
    color: COLORS.black2,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  boxStyle: {
    justifyContent: "center",
    alignItems: "center",
    ...SIZES.marginHorizontal,
    width: 327,
    height: 97,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    marginTop: 58,
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  boxText: {
    color: "#6B7280",
    ...FONTS.body2,
    fontSize: 12,
  },
  amountButton: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    height: 40,
    width: 95,
  },
  amountButtonText: {
    ...FONTS.body2,
    color: COLORS.black,
    fontSize: 14,
  },
  keyboard: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 45,
    // ...SIZES.marginHorizontal
  },
  amount: {
    color: COLORS.darkBlue3,
    ...FONTS.h4,
    lineHeight: null,
    fontSize: 24,
    marginLeft: 20,
    width: 250,
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
