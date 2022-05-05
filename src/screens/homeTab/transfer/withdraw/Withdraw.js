import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Header, Button } from "@components";
import { TouchableOpacity } from "react-native-gesture-handler";
import VirtualKeyboard from "react-native-virtual-keyboard";
import SelectBankModal from "./SelectBankModal";
import { setWithdrawAmount } from "@redux/reducers/withdrawSlice";
import { useDispatch, useSelector } from "react-redux";

/* 
summray
Witdraw scren to let user withdraw amount from balance

*/

const WithDraw = ({ navigation }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("0");
  const [isModalVisible, setModalVisible] = useState(false);

  const bankId = useSelector((state) => state.withdraw.bankId);
  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //render

  function renderHeader() {
    return (
      <Header
        title={t("withdraw")}
        rightIcon={icons.right_arrow}
        onRightIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderBankItem() {
    return (
      <View style={styles.box}>
        <Image
          style={{ width: 47, height: 47 }}
          source={require("@assets/dummyData/visa.png")}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.boxTitle}>Unicredit</Text>
          <Text style={styles.boxText}>**********3009</Text>
        </View>
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
          }}
          onPress={() => toggleModal()}
        >
          <Image
            style={{ width: 20, height: 20, tintColor: "#9CA3AF" }}
            source={icons.down_arrow}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderKeyboard_Text() {
    return (
      <View style={styles.keyboard}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.amount}>
          {amount}
        </Text>
        <Text style={styles.maxText}>{t("maxAmount")} $999</Text>

        <VirtualKeyboard
          color={COLORS.darkBlue3}
          decimal={true}
          pressMode="string"
          clearOnLongPress={true}
          rowStyle={{ height: 80 }}
          // cellStyle={{width:125}}
          onPress={(val) => setAmount(val ? val : 0)}
        />
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      {/* HEADER */}
      {renderHeader()}

      {/* Bank  */}
      {renderBankItem()}

      {/* Virutal keyborad and typed text */}
      {renderKeyboard_Text()}
      <View>
        {/* continue button  */}
        <Button
          label={t("continue")}
          containerStyle={styles.continueButton}
          labelStyle={styles.continueButtonLabel}
          onPress={() => {
            dispatch(setWithdrawAmount(amount));
            navigation.navigate("withdrawConfirmation");
          }}
        />
      </View>
      {/* modal to select bank or add new bank */}
      <SelectBankModal isVisible={isModalVisible} closeModel={toggleModal} />
    </View>
  );
};

export default WithDraw;

const styles = StyleSheet.create({
  box: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    width: 327,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#E5E7EB",
    marginTop: 58,
  },
  boxTitle: {
    ...FONTS.h4,
    fontSize: 16,
    color: "#1D3A70",
  },
  boxText: {
    ...FONTS.body2,
    fontSize: 12,
    color: "#6B7280",
  },
  keyboard: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 45,
    // ...SIZES.marginHorizontal
  },
  amount: {
    color: COLORS.darkBlue3,
    ...FONTS.h3,
    fontSize: 50,
    paddingTop: 40,
    height: 80,
  },
  maxText: {
    ...FONTS.body3,
    fontSize: 11,
    color: "#6B7280",
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
