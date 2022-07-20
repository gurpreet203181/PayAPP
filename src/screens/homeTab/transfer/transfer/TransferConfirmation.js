import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData, images } from "@constants";
import {
  Header,
  IconButton,
  ProfileButton,
  CustomSwipeButton,
} from "@components";
import { useSelector } from "react-redux";
import Dash from "react-native-dash";
import { AntDesign } from "@expo/vector-icons";
import { Transfer_Funds_Between_Wallets } from "src/api/rapyd/WalletTransactionObject";
import { showMessage } from "react-native-flash-message";

const TransferConfirmation = ({ navigation }) => {
  const { amount, contact } = useSelector((state) => state.transfer); //getting deatil from transfer reduxer about ammount and id
  //getting selected payment method detail from paymentMethodSlice which selected on paymentMethod screen

  const { user } = useSelector((state) => state.userInfo);

  const [showDetail, setShowDetial] = useState(false);

  const transfer = async () => {
    const transferObj = {
      source_ewallet: user.ewalletId,
      amount: amount,
      currency: "EUR",
      destination_ewallet: contact?.ewalletId,
    };

    await Transfer_Funds_Between_Wallets(transferObj)
      .then((response) => {
        console.log(response);
        if (response?.status?.status == "SUCCESS") {
          navigation.replace("PaymentSuccess", {
            lottie: images.successfulLottie2,
          });
        } else {
          showMessage({
            message: "Something Went Wrong, Please Try Again!",
            //description: "Please select a friend",
            type: "danger",
          });
          navigation.navigate("Home");
        }
      })
      .catch((e) => {
        showMessage({
          message: "Something Went Wrong, Please Try Again!",
          //description: "Please select a friend",
          type: "danger",
        });
        navigation.navigate("Home");
      });
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("paymentSummary")}
        leftIcon={icons.close}
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
          <Text style={styles.rowText2}>€ {amount}</Text>
        </View>

        {/* receiverId */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("receiver")}</Text>
          <Text style={styles.rowText2}>{contact.username}</Text>
        </View>
        {/* payment Method */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("paymentMethod")}</Text>
          <Text style={styles.rowText2}>{t("inAppBalance")}</Text>
        </View>
      </View>
    );
  }

  function renderProfile() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          ...SIZES.marginHorizontal,
          marginTop: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Dash
            style={{ width: 120, height: 1 }}
            dashGap={7}
            dashLength={6}
            dashColor={"#D5D5E4"}
          />

          <ProfileButton
            icon={dummyData.myProfile.profileImage}
            containerStyle={{
              backgroundColor: COLORS.primary,
              marginHorizontal: 20,
              width: 40,
              height: 40,
            }}
          />

          <Dash
            style={{ width: 120, height: 1 }}
            dashGap={7}
            dashLength={6}
            dashColor={"#D5D5E4"}
          />
        </View>

        <Text
          style={{
            marginTop: 13,
            ...FONTS.h4,
            color: COLORS.darkBlue3,
            fontSize: 18,
            letterSpacing: 0.3,
          }}
        >
          {contact?.username}{" "}
        </Text>
        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.body5,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {contact?.name}
        </Text>
      </View>
    );
  }
  function renderTotalAmount() {
    return (
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{t("total")}</Text>
        <Text style={styles.totalAmount}>€ {amount}</Text>
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
          containerStyle={{
            ...styles.IconButtonContainer,
            backgroundColor: "#32A7E2",
          }}
          disable={true}
          icon={icons.transfer}
          iconStyle={{ ...styles.IconButtonIcon }}
        />

        <Text style={styles.title}>{t("transferDetails")}</Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() =>
            showDetail ? setShowDetial(false) : setShowDetial(true)
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                opacity: 0.5,
                ...FONTS.body5,
                fontSize: 13,
                letterSpacing: 0.3,
              }}
            >
              {t("details")}
            </Text>
            <AntDesign
              name="downcircleo"
              style={{ opacity: 0.5, marginLeft: 8 }}
              size={15}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {showDetail &&
          /* {details} */
          renderDetail()}

        {/* profile */}
        {renderProfile()}
        {/* Total amount */}
        {renderTotalAmount()}
      </ScrollView>
      {/* Swipe Button */}
      <View
        style={{
          marginTop: 36,
          ...SIZES.marginHorizontal,
          bottom: 50,
        }}
      >
        <CustomSwipeButton title={t("swipeToSend")} onSwipeSuccess={transfer} />
      </View>
    </View>
  );
};

export default TransferConfirmation;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    ...SIZES.marginHorizontal,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: 350,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 25,
  },

  rowText: {
    ...FONTS.body5,
    color: COLORS.lightGray3,
  },
  rowText2: {
    ...FONTS.h4,
    color: COLORS.darkBlue3,
  },

  IconButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
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
