import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Header, Button } from "@components";
import VirtualKeyboard from "react-native-virtual-keyboard";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { get_List_Payout_Method_Types } from "src/api/rapyd/PayoutObject";
import { showMessage } from "react-native-flash-message";
import { utils } from "src/utils";
import { useNavigation } from "@react-navigation/native";

const Step1 = (prop) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userInfo);
  const { balance } = useSelector((state) => state.userInfo.user);

  const [amount, setAmount] = useState("0");
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getMethodTypes = async () => {
      let data = [];
      await get_List_Payout_Method_Types(user)
        .then((response) => {
          if (response?.status?.status == "SUCCESS") {
            response?.data.map((item) => {
              if (
                item?.category == "bank" &&
                item?.payout_method_type ==
                  `${item?.beneficiary_country}_general_bank`
              ) {
                data.push({
                  label: item?.name,
                  value: item.payout_method_type,
                });
              }
            });
            if (data.length == 0) {
              data.push({
                label: "No option found. Conatct us",
                value: "no_option",
              });
            } else {
              data.push({
                label: "Other option",
                value: "Other_method",
              });
            }
            setItems(data);
          }
        })

        .catch((e) => {
          console.log(e);
        });
    };
    getMethodTypes();
  }, []);

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

    if (value == null) {
      showMessage({
        message: "Select withdraw option",
        type: "danger",
      });
      return false;
    }
    return true;
  }
  const onContinuePress = async () => {
    if (isValid()) {
      const formattedAmount = utils.ammountFormat(amount, "EUR");
      await prop.saveState({ amount: formattedAmount });
      await prop.saveState({ payoutMethod: value });

      prop.next();
    }
  };

  //render

  function renderHeader() {
    return (
      <Header
        title={t("withdraw")}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => {
          navigation.navigate("more");
        }}
      />
    );
  }
  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      {/* HEADER */}
      {renderHeader()}

      <View
        style={{
          flex: 0.4,
          ...SIZES.marginHorizontal,
          marginTop: 30,
          zIndex: 1,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={t("selectAvailableMethod")}
        />
      </View>
      {/* Virutal keyborad and typed text */}
      <View style={{ flex: 0.3, marginTop: 30, ...SIZES.marginHorizontal }}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.amount}>
          {amount}
        </Text>
      </View>

      <VirtualKeyboard
        color={COLORS.darkBlue3}
        decimal={true}
        pressMode="string"
        clearOnLongPress={true}
        rowStyle={{ height: 60 }}
        // cellStyle={{width:125}}
        onPress={(val) => setAmount(val ? val : 0)}
      />

      <View>
        {/* continue button  */}
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

export default Step1;

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
