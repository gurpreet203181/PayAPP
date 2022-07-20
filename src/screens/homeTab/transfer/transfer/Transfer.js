import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, icons, SIZES } from "@constants";
import { Button, Header, SelectedConatctItem } from "@components";
import SelectContactModel from "../SelectContactModel";
import VirtualKeyboard from "react-native-virtual-keyboard";
import { setTransferDetails } from "@redux/reducers/transferSlice";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { utils } from "src/utils";
const Transfer = ({ navigation }) => {
  const dispatch = useDispatch();

  const selectedContact = useSelector((state) => state.selectedContact.contact);
  const { balance } = useSelector((state) => state.userInfo.user);

  const [amount, setAmount] = useState("0");

  const [isModalVisible, setModalVisible] = useState(false);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    if (amount > balance) {
      showMessage({
        message: "Insufficient balance",
        type: "danger",
      });
      return false;
    }
    if (selectedContact.username == null) {
      showMessage({
        message: "Please select a friend",
        //description: "Please select a friend",
        type: "danger",
      });
      return false;
    }
    return true;
  }
  //on press of continue button
  const onContinuePress = async () => {
    if (isValid()) {
      const formattedAmount = utils.ammountFormat(amount, "EUR");
      dispatch(setTransferDetails({ formattedAmount, selectedContact }));
      //navigation to paymentMethod screen with nextscreen name as prop
      navigation.navigate("TransferConfirmation");
    }
  };
  //render

  function renderHeader() {
    return (
      <Header
        title={t("transferMoney")}
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderContact() {
    return (
      <View style={{ marginTop: 58 }}>
        {selectedContact && (
          <SelectedConatctItem
            item={selectedContact}
            onIconPress={toggleModal}
          />
        )}
      </View>
    );
  }
  function renderKeyboard_Text() {
    return (
      <View style={styles.keyboard}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.amount}>
          {amount}
        </Text>

        <VirtualKeyboard
          color={COLORS.darkBlue3}
          decimal={true}
          pressMode="string"
          clearOnLongPress={true}
          rowStyle={{ flex: 0.2 }}
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
      {/* header */}

      {renderHeader()}

      {/* reder latest recent contact */}
      <View
        style={{
          flex: 0.25,
          width: "100%",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        {renderContact()}
      </View>

      {/* render virtual keyboard  and text  */}
      <View
        style={{
          flex: 0.7,
          width: "100%",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        {renderKeyboard_Text()}
      </View>

      {/* continue button */}
      <View
        style={{
          flex: 0.1,
          width: "100%",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <Button
          label={t("continue")}
          containerStyle={styles.continueButton}
          labelStyle={styles.continueButtonLabel}
          onPress={onContinuePress}
        />

        {/* select contact model  */}
        <View>
          <SelectContactModel
            isVisible={isModalVisible}
            closeModel={toggleModal} //useCallBack to get selected contact from modal
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  keyboard: {
    justifyContent: "flex-start",
    alignItems: "center",
    // ...SIZES.marginHorizontal
  },
  amount: {
    color: COLORS.darkBlue3,
    ...FONTS.h3,
    fontSize: 50,
    paddingTop: 40,
  },
  continueButton: {
    width: 327,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.darkBlue3,
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
