import React from "react";
import { t } from "../../../hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../../../constants";
import { Header } from "../../../components";
import { useSelector } from "react-redux";

const Confirmation = ({ navigation }) => {
  //render
  function renderHeader() {
    return (
      <Header
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  const amount = useSelector((state) => state.transfer.amount);
  const reciverId = useSelector((state) => state.transfer.receiverId);
  const paymentMethod = useSelector((state) => state.transfer.paymentMethod);

  return (
    <View style={{ flex: 1, backgroundColor: "#EFF2F4" }}>
      {/* Header */}
      {renderHeader()}
      <View style={styles.container}>
        <Text style={styles.title}>{t("paymentDetails")}</Text>
        {/* amount */}
        <View style={styles.row}>
          <Text>{t("amount")}</Text>
          <Text>{amount}</Text>
        </View>

        <View style={styles.row}>
          <Text>{t("paymentMethod")}</Text>
          <Text>{amount}</Text>
        </View>
        <View style={styles.row}>
          <Text>{t("amount")}</Text>
          <Text>{amount}</Text>
        </View>
        <View style={styles.row}>
          <Text>{t("amount")}</Text>
          <Text>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    marginTop: 55,
    backgroundColor: COLORS.white,
    ...SIZES.marginHorizontal,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 33,
    ...FONTS.h4,
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
