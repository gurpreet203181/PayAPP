import React, { useState } from "react";
import { t } from "@hooks/UseI18n";

import { View, Text, StyleSheet } from "react-native";
import { COLORS, icons, FONTS, SIZES, images } from "@constants";
import { Header, CustomSwipeButton, IconButton } from "@components";
import { useSelector } from "react-redux";
import { topUp_Ewallet } from "src/api/rapyd/PaymentObject";
import { firestoreDb } from "@config/firebase";

import { create_Customer } from "src/api/rapyd/customerObject";
const TopUpConfirmation = ({ navigation }) => {
  const { amount } = useSelector((state) => state.topUp);
  const { user } = useSelector((state) => state.userInfo);

  const onSWipe = async () => {
    let customerId = user?.customerId !== "" ? user?.customerId : "";
    //checking if user have customer id
    if (customerId == "") {
      await create_Customer(user).then((response) => {
        if (response?.status?.status == "SUCCESS") {
          customerId = response?.data?.id;
        }
        firestoreDb
          .collection("users")
          .doc(user?.uid)
          .update({
            customerId: customerId,
          })
          .catch((e) => {
            console.log("add friend:" + e);
          });
      });
    }

    await topUp_Ewallet(amount, user, customerId)
      .then((response) => {
        console.log(response);
        if (response.status?.status == "SUCCESS") {
          const url = response.data?.redirect_url;
          navigation.navigate("UrlWebview", { redirect_url: url });
          //Linking.openURL(redirect_url);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("paymentSummary")}
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.navigate("Home")}
      />
    );
  }

  function renderDetail() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 35,
        }}
      >
        {/* amount */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("amount")}</Text>
          <Text style={styles.rowText2}>€{amount}</Text>
        </View>

        {/* receiverId */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("fee")}</Text>
          <Text style={styles.rowText2}>€ 2</Text>
        </View>
        {/* payment Method */}
        <View style={{ ...styles.row, marginTop: 50 }}>
          <Text style={styles.rowText}>{t("total")}</Text>
          <Text style={styles.rowText2}>Card</Text>
        </View>

        {/* total ammount card */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{t("total")}</Text>
          <Text style={styles.totalAmount}>€ {amount}</Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      {/* Header */}
      {renderHeader()}
      {/* Logo & title */}
      <View style={styles.container}>
        <IconButton
          containerStyle={styles.IconButtonContainer}
          disable={true}
          icon={icons.transfer}
          iconStyle={{ ...styles.IconButtonIcon }}
        />

        <Text style={styles.title}>{t("topUpDetail")}</Text>
      </View>
      {/* Details */}
      {renderDetail()}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
        }}
      >
        <CustomSwipeButton title={t("proceed")} onSwipeSuccess={onSWipe} />
      </View>
    </View>
  );
};

export default TopUpConfirmation;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: 350,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 25,
  },

  rowText: {
    ...FONTS.body5,
    color: COLORS.black,
    opacity: 0.4,
  },
  rowText2: {
    ...FONTS.body5,
    color: COLORS.black,
  },
  container: {
    marginTop: 64,
    ...SIZES.marginHorizontal,
    justifyContent: "center",
    alignItems: "center",
  },
  IconButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B548C6",
  },

  IconButtonIcon: {
    tintColor: COLORS.white,
    width: 22,
    height: 22,
  },
  title: {
    marginTop: 24,
    ...FONTS.h4,
    fontSize: 16,
  },
  totalContainer: {
    height: 76,
    width: 315,
    ...SIZES.marginHorizontal,
    backgroundColor: "#E2E2F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginTop: 40,
  },
  totalText: {
    ...FONTS.h4,
    fontSize: 16,
    color: COLORS.darkBlue3,
    letterSpacing: 0.3,
  },
  totalAmount: {
    ...FONTS.h4,
    fontSize: 22,
    color: COLORS.darkBlue3,
    paddingTop: 7,
  },
});
