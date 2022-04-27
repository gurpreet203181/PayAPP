import React, { useEffect, useState } from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../../constants";
import {
  Button,
  Header,
  IconButton,
  TransactionItem,
  Section,
} from "../../components";
import { FontAwesome } from "@expo/vector-icons";

const TransferDashboard = ({ navigation }) => {
  const [balance, setBalance] = useState("Rp 8.250.000");
  const [incomingTransaction, setIncomingTransactions] = useState([]);
  const [outgoingTansaction, setOutgoingTransactions] = useState([]);

  //getData from dummydata only once
  useEffect(() => {
    const getData = async () => {
      setIncomingTransactions(
        dummyData.Transaction.filter((x) => x.type == "input")
      );
      setOutgoingTransactions(
        dummyData.Transaction.filter((x) => x.type == "output")
      );
    };
    getData();
  }, []);
  //render
  function renderHeader() {
    return (
      <Header
        title={t("appName")}
        rightIcon={icons.userIcon}
        rightIconStyle={{ width: 22, height: 22 }}
      />
    );
  }
  function renderBalance() {
    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{t("yourBalance")}</Text>

        {/* check if user have balance or not and showing message */}
        {balance ? (
          <View
            style={{
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.balance}>{balance}</Text>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={styles.noBalance}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {t("noBalance")}
            </Text>

            <Button
              label={t("depositNow")}
              containerStyle={{ marginTop: 20 }}
              labelStyle={{
                color: COLORS.darkBlue2,
                ...FONTS.h3,
                fontSize: 18,
              }}
              icon={icons.right_arrow}
              iconPosition={"RIGHT"}
              iconStyle={{
                width: 16,
                height: 16,
                marginLeft: 10,
                tintColor: COLORS.darkBlue2,
              }}
            />
          </View>
        )}
      </View>
    );
  }
  function renderOptions() {
    return (
      <View
        style={{
          marginTop: 48,
          ...SIZES.marginHorizontal,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Transfer */}
        <View style={styles.IconButtonView}>
          <IconButton
            containerStyle={{
              ...styles.IconButtonContainer,
              backgroundColor: "#32A7E2",
            }}
            icon={icons.transfer}
            iconStyle={{ ...styles.IconButtonIcon }}
            onPress={() => navigation.navigate("Transfer")}
          />

          <Text style={styles.IconButtonText}>{t("transfer")}</Text>
        </View>

        {/* Top UP */}
        <View style={styles.IconButtonView}>
          <IconButton
            containerStyle={{
              ...styles.IconButtonContainer,
              backgroundColor: "#B548C6",
            }}
            icon={icons.topUp}
            iconStyle={{ ...styles.IconButtonIcon }}
            onPress={() => navigation.navigate("TopUp")}
          />

          <Text style={styles.IconButtonText}>{t("topUp")}</Text>
        </View>

        {/* Bill */}
        <View style={styles.IconButtonView}>
          <IconButton
            containerStyle={{
              ...styles.IconButtonContainer,
              backgroundColor: "#FF8700",
            }}
            icon={icons.transfer}
            iconStyle={{ ...styles.IconButtonIcon }}
          />

          <Text style={styles.IconButtonText}>{t("bill")}</Text>
        </View>

        {/* More */}
        <View style={styles.IconButtonView}>
          <IconButton
            containerStyle={{
              ...styles.IconButtonContainer,
              backgroundColor: "#22B07D",
            }}
            icon={icons.more}
            iconStyle={{ ...styles.IconButtonIcon }}
            onPress={() => navigation.navigate("more")}
          />

          <Text style={styles.IconButtonText}>{t("more")}</Text>
        </View>
      </View>
    );
  }
  function renderIncomingTransactions() {
    return (
      <View>
        {incomingTransaction.slice(0, 2).map((item, index) => {
          return (
            <TransactionItem
              item={item}
              onPress={() => navigation.navigate("TransactionDetail", { item })}
              containerStyle={styles.transactionItemContainer}
            />
          );
        })}
      </View>
    );
  }
  function renderOutgoingTransactions() {
    return (
      <View>
        <Section label={t("outgoingTansaction")} />
        {outgoingTansaction.slice(0, 2).map((item, index) => {
          return (
            <TransactionItem
              item={item}
              onPress={() => navigation.navigate("TransactionDetail", { item })}
              containerStyle={{
                ...styles.transactionItemContainer,
                marginBottom: index == 1 ? 80 : null,
              }}
            />
          );
        })}
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Balance  */}
      {renderBalance()}

      {/* Options */}
      {renderOptions()}
      <View style={{ marginTop: 90, flex: 1 }}>
        <Section label={t("incomingTransaction")} />
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* incoming transaction */}
          {renderIncomingTransactions()}

          {/* outgoing transaction */}

          {renderOutgoingTransactions()}
        </ScrollView>
      </View>
    </View>
  );
};

export default TransferDashboard;

const styles = StyleSheet.create({
  balanceContainer: {
    ...SIZES.marginHorizontal,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  balanceText: {
    ...FONTS.body3,
    fontSize: 14,
    color: COLORS.black2,
    opacity: 0.5,
  },
  balance: {
    color: COLORS.darkBlue2,
    ...FONTS.h3,
    fontSize: 36,
    paddingTop: 20,
  },

  noBalance: {
    textAlign: "center",
    ...FONTS.h4,
    opacity: 0.5,
  },
  IconButtonView: {
    justifyContent: "center",
    alignItems: "center",
  },
  IconButtonContainer: {
    width: 48,
    height: 48,
    borderRadius: 20,
  },
  IconButtonIcon: {
    tintColor: COLORS.white,
    width: 20,
    height: 20,
  },
  IconButtonText: {
    marginTop: 12,
    ...FONTS.body3,
    fontSize: 13,
    letterSpacing: 0.3,
    color: "#818197",
  },
  transactionItemContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    padding: 10,
  },
});
