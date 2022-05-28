import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, icons, SIZES } from "@constants";
import { Button, Header, SelectedConatctItem } from "@components";
import SelectContactModel from "../SelectContactModel";
import VirtualKeyboard from "react-native-virtual-keyboard";
import { setTransferDetails } from "@redux/reducers/transferSlice";
import { useDispatch, useSelector } from "react-redux";

const Transfer = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.selectedContact.contact);

  const [amount, setAmount] = useState("0");

  const [isModalVisible, setModalVisible] = useState(false);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("transferMoney")}
        leftIcon={icons.close}
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
          flex: 0.6,
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
          onPress={() => {
            dispatch(setTransferDetails({ amount, selectedContact }));

            //navigation to paymentMethod screen with nextscreen name as prop
            navigation.navigate("PaymentMethod", {
              nextScreen: "TransferConfirmation",
            });
          }}
        />

        {/* select contact model  */}
        <View>
          <SelectContactModel
            isVisible={isModalVisible}
            closeModel={toggleModal} //useCallBack to get selected contact from modal
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
    height: 80,
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
