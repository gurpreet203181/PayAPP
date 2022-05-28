import React from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS, icons, SIZES, FONTS } from "@constants";
import { Header, IconButton, CategorieItem } from "@components";
import { BarChart } from "react-native-gifted-charts";

const Activity = ({ navigation }) => {
  //render
  const data = [
    {
      value: 88,
      label: "Jan",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 20, frontColor: COLORS.darkBlue3 },
    {
      value: 50,
      label: "Feb",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 40, frontColor: COLORS.darkBlue3 },
    {
      value: 75,
      label: "Mar",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 25, frontColor: COLORS.darkBlue3 },
    {
      value: 30,
      label: "Apr",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 20, frontColor: COLORS.darkBlue3 },
    {
      value: 60,
      label: "May",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 40, frontColor: COLORS.darkBlue3 },
    {
      value: 22,
      label: "Jun",
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor: "#1DAB87",
    },
    { value: 30, frontColor: COLORS.darkBlue3 },
  ];

  function renderHeader() {
    return (
      <Header
        title={t("activity")}
        rightIcon={icons.option}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderBarChart() {
    return (
      <View style={{ marginTop: 32, ...SIZES.marginHorizontal }}>
        <BarChart
          data={data}
          barWidth={12}
          spacing={34}
          roundedTop
          dashGap={20}
          //roundedBottom
          xAxisThickness={0}
          onPress={() => console.log("s")}
          yAxisThickness={0}
          yAxisTextStyle={{ color: "#6B7280" }}
          noOfSections={4}
          isAnimated
          height={168}
          width={320}
        />
      </View>
    );
  }
  function renderIncome_ExpenseButton() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
          ...SIZES.marginHorizontal,
          justifyContent: "space-around",
        }}
      >
        {/* income */}
        <View style={styles.contanier}>
          <IconButton
            icon={icons.down_arrow}
            iconStyle={{ width: 30, height: 30 }}
            containerStyle={styles.iconContanier}
          />
          <View>
            <Text style={styles.text}>{t("income")}</Text>
            <Text style={styles.amount}>$1,300.00</Text>
          </View>
        </View>
        {/* expense */}
        <View style={styles.contanier}>
          <IconButton
            icon={icons.up_arrow}
            iconStyle={{ width: 20, height: 20 }}
            containerStyle={styles.iconContanier}
          />
          <View>
            <Text style={styles.text}>{t("expense")}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.amount}>
              $265.80
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}
      <View style={{ flex: 2 }}>
        {/* Total spending */}
        <View style={styles.spendingView}>
          <View>
            <Text style={styles.totalSpendText}>{t("totalSpending")}</Text>
            <Text style={styles.total}>$2,265.80</Text>
          </View>
          {/* Period */}
          <View style={styles.periodBox}>
            <Text style={styles.periodText}>Month</Text>
            <Image
              source={icons.down_arrow}
              style={{ width: 16, height: 16, marginLeft: 8 }}
            />
          </View>
        </View>
      </View>

      {/* Bar Chart */}
      {renderBarChart()}
      {/* Income and Expense */}
      {renderIncome_ExpenseButton()}

      {/* Categories */}
      <View style={{ flex: 5, marginTop: 50, ...SIZES.marginHorizontal }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.categories}
          >
            {t("categories")}
          </Text>
          <View style={styles.periodBox}>
            <Text style={styles.periodText}>{t("expense")}</Text>
            <Image
              source={icons.down_arrow}
              style={{ width: 16, height: 16, marginLeft: 8 }}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 25,
          }}
        >
          <CategorieItem
            icon={icons.home}
            iconStyle={{ tintColor: "#1DAB87" }}
            label={t("investments")}
            amount={"$595.20"}
          />
          <CategorieItem
            icon={icons.home}
            iconStyle={{ tintColor: "#1DAB87" }}
            label={t("Shopping")}
            amount={"$85.20"}
            containerStyle={{ marginLeft: 20 }}
          />
          <CategorieItem
            icon={icons.home}
            iconStyle={{ tintColor: "#1DAB87" }}
            label={t("Fitness ")}
            amount={"$350"}
            containerStyle={{ marginLeft: 20 }}
          />
          <CategorieItem
            icon={icons.home}
            iconStyle={{ tintColor: "#1DAB87" }}
            label={t("investments")}
            amount={"$350"}
            containerStyle={{ marginLeft: 20 }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  spendingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    ...SIZES.marginHorizontal,
    marginTop: 24,
  },
  totalSpendText: {
    color: "#6B7280",
    ...FONTS.body2,
    fontSize: 14,
  },
  total: {
    marginTop: 8,
    ...FONTS.h2,
    color: COLORS.darkBlue3,
    fontSize: 24,
  },
  periodBox: {
    width: 86,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  periodText: {
    color: COLORS.black,
    ...FONTS.body2,
    fontSize: 14,
  },
  contanier: {
    width: 155,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContanier: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  text: {
    color: "#6B7280",
    ...FONTS.body3,
    fontSize: 12,
  },
  amount: {
    color: COLORS.darkBlue3,
    ...FONTS.h5,
    fontSize: 14,
  },
  categories: {
    ...FONTS.h2,
    fontSize: 20,
    color: COLORS.darkBlue3,
  },
});
