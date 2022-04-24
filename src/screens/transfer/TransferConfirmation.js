import React, { useState } from "react";
import { t } from "../../hooks/UseI18n";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  dummyData,
  images,
} from "../../constants";
import { Header, IconButton, ProfileButton } from "../../components";
import { useSelector } from "react-redux";
import Dash from "react-native-dash";
import { AntDesign } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button";
const TransferConfirmation = ({ navigation }) => {
  const { amount, receiverId, paymentMethod } = useSelector(
    (state) => state.transfer
  );
  const [promoCode, setPromeCode] = useState();
  const [showDetail, setShowDetial] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const PaymentSucceed = () => {
    setShowModal(true);
  };
  const closeModel = () => {
    setShowModal(false);
  };
  //swipe thumb icon component
  const swipeButton = () => {
    return (
      <Image
        source={icons.right_arrow}
        style={{ width: 20, height: 20, tintColor: COLORS.purple }}
      />
    );
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("paymentSummary")}
        rightIcon={icons.close}
        onRightIconPress={() => navigation.navigate("Home")}
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
          <Text style={styles.rowText2}>£ {amount}</Text>
        </View>

        {/* receiverId */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("receiver")}</Text>
          <Text style={styles.rowText2}>Andrea Summer</Text>
        </View>
        {/* payment Method */}
        <View style={styles.row}>
          <Text style={styles.rowText}>{t("paymentMethod")}</Text>
          <Text style={styles.rowText2}>{paymentMethod}</Text>
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
            icon={dummyData.myProfile.profile_image}
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
            fontSize: 18,
            letterSpacing: 0.3,
          }}
        >
          Andrea Summer
        </Text>
        <Text
          style={{
            color: COLORS.black,
            opacity: 0.5,
            ...FONTS.body5,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          0821 - 7654 - 3210
        </Text>
      </View>
    );
  }
  function renderTotalAmount() {
    return (
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{t("total")}</Text>
        <Text style={styles.totalAmount}>$ {amount}</Text>
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

        <Text style={styles.title}>{t("Transfer Details")}</Text>
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
        <SwipeButton
          disabled={false}
          swipeSuccessThreshold={100}
          height={64}
          width={315}
          title={t("swipeToSend")}
          titleColor="white"
          titleFontSize={15}
          shouldResetAfterSuccess={false}
          onSwipeSuccess={() => {
            navigation.replace("PaymentSuccess", {
              lottie: images.successfulLottie2,
            });
          }}
          railBackgroundColor={COLORS.purple}
          railBorderColor={COLORS.purple}
          railFillBackgroundColor={"rgba(0,0,128, 0.3)"}
          railFillBorderColor={"rgba(0,0,128, 0.3)"}
          thumbIconBackgroundColor={COLORS.white}
          thumbIconBorderColor={COLORS.purple}
          thumbIconComponent={swipeButton}
        />
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
    color: COLORS.black,
    opacity: 0.4,
  },
  rowText2: {
    ...FONTS.body5,
    color: COLORS.black,
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
    color: "#3F3F65",
    letterSpacing: 0.3,
  },
  totalAmount: {
    ...FONTS.h4,
    fontSize: 22,
    color: "#3F3F65",
    paddingTop: 7,
  },
});
