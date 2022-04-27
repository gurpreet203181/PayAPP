import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@hooks/UseI18n";
import { MoreItem, Header, LineDivider } from "@components";
import { FONTS, COLORS, icons, SIZES } from "@constants";

const More = ({ navigation }) => {
  //header
  function renderHeader() {
    return (
      <Header
        title={t("menu")}
        rightIcon={icons.right_arrow}
        onRightIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderItems() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 24 }}
      >
        <MoreItem
          icon={icons.option}
          title={t("transferMoney")}
          iconStyle={{ tintColor: "#32A7E2" }}
          onPress={() => navigation.navigate("Transfer")}
        />
        <MoreItem
          icon={icons.userIcon}
          title={t("topupWallet")}
          iconStyle={{ tintColor: "#FB923C" }}
          onPress={() => navigation.navigate("TopUp")}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("billPayment")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("withdraw")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
          onPress={() => navigation.navigate("WithDraw")}
        />

        <LineDivider
          lineStyle={{
            height: 1,
            backgroundColor: "#F3F4F6",
            margin: 24,
            ...SIZES.marginHorizontal,
            width: "85%",
          }}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("historyTransactions")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("requestPayment")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("settings")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
        />
        <MoreItem
          icon={icons.transfer}
          title={t("help")}
          iconContainerStyle={{ backgroundColor: "#32A7E2" }}
        />
      </ScrollView>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      <View
        style={{
          height: 206,
          justifyContent: "center",
          alignItems: "center",
          ...SIZES.marginHorizontal,
        }}
      >
        <Text>comming soon</Text>
      </View>
      {/* Menu */}
      {renderItems()}
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  listItemView: {
    padding: 16,
    paddingLeft: 32,
  },
});
