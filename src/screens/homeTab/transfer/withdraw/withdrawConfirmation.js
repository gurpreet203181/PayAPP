import React from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, icons, FONTS, SIZES, images } from "@constants";
import { Header, IconButton, CustomSwipeButton } from "@components";
import { useSelector } from "react-redux";
import { create_Payout } from "src/api/rapyd/PayoutObject";
const WithdrawConfirmation = ({ navigation, route }) => {
  const { user } = useSelector((state) => state?.userInfo);

  const finalState = route?.params?.finalState;

  const onConfirm = async () => {
    await create_Payout(user, finalState).then((response) => {
      if (response?.status?.status == "SUCCESS") {
        navigation.replace("PaymentSuccess", {
          lottie: images.successfulLottie2,
        });
      }
    });
  };
  //render
  function renderHeader() {
    return (
      <Header
        title={t("paymentSummary")}
        leftIcon={icons.close}
        onLeftIconPress={() => navigation.goBack()}
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
          <Text style={styles.rowText2}>{finalState?.amount}</Text>
        </View>

        {/* receiverId */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("payout option")}</Text>
          <Text style={styles.rowText2}>{finalState?.payoutMethod}</Text>
        </View>
        {/* payment Method */}
        <View style={{ ...styles.row, marginTop: 50 }}>
          <Text style={styles.rowText}>{t("total")}</Text>
          <Text style={styles.rowText2}>{finalState?.amount}</Text>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.white }}
    >
      {/* Header*/}
      {renderHeader()}
      {/* Logo & title */}

      <View style={styles.container}>
        <IconButton
          containerStyle={styles.IconButtonContainer}
          disable={true}
          icon={icons.transfer}
          iconStyle={{ ...styles.IconButtonIcon }}
        />

        <Text style={styles.title}>{t("withdrawDetails")}</Text>
      </View>
      {/* Deatils */}
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
        <CustomSwipeButton
          title={t("confirmWithdraw")}
          onSwipeSuccess={onConfirm}
        />
      </View>
    </View>
  );
};
export default WithdrawConfirmation;

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
});
