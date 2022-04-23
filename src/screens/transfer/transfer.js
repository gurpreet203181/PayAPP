import React, { useEffect, useState, useCallback } from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { FONTS, COLORS, icons, SIZES, dummyData } from "../../constants";
import { Button, Header, SelectedContactItem } from "../../components";
import SelectContactModel from "./SelectContactModel";
import VirtualKeyboard from "react-native-virtual-keyboard";
import { setTransferDetails } from "../../redux/reducers/transferSlice";
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
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderContact() {
    return (
      <View style={{ marginTop: 58 }}>
        {selectedContact && (
          <SelectedContactItem
            item={selectedContact}
            onIconPress={toggleModal}
          />
        )}
      </View>
    );
  }
  function renderKeyboard() {
    return (
      <View style={styles.keyboard}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.amount}>
          {amount}
        </Text>

        <VirtualKeyboard
          color="#9494AD"
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
      {renderContact()}

      {/* render virtual keyboard  and text  */}
      {renderKeyboard()}

      {/* continue button */}
      <View>
        <Button
          label={t("continue")}
          containerStyle={styles.continueButton}
          labelStyle={styles.continueButtonLabel}
          onPress={() => {
            dispatch(setTransferDetails({ amount, selectedContact }));
            navigation.navigate("PaymentMethod");
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
    marginTop: 45,
    // ...SIZES.marginHorizontal
  },
  amount: {
    color: "#525298",
    ...FONTS.h3,
    fontSize: 50,
    paddingTop: 40,
    height: 80,
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
