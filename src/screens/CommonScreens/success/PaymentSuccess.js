import React from "react";
import { t } from "../../../hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, Fonts, icons, SIZES } from "../../../constants";
import { Button, Header } from "../../../components";
import LottieView from "lottie-react-native";

const PaymentSuccess = ({ navigation }) => {
  //render

  function renderLottieNfc() {
    return (
      <LottieView
        source={require("../../../assets/images/successful.json")}
        autoPlay
        loop={false}
        //  speed={2}
        style={{
          width: "100%",
          height: 210,
          alignSelf: "center",
        }}
      />
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      <View
        style={{
          flex: 0.8,
          justifyContent: "center",
          alignItems: "center",
          ...SIZES.marginHorizontal,
        }}
      >
        {renderLottieNfc()}
        <Text style={styles.successText}>{t("paymentSuccess")}</Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          style={styles.successText2}
        >
          {t("paymentInfoText")}
        </Text>
      </View>

      <View style={{ ...SIZES.marginHorizontal }}>
        <Button
          label={t("procced")}
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  successText: {
    marginTop: 40,
    ...FONTS.h4,
    letterSpacing: 0.3,
    fontSize: 20,
  },
  successText2: {
    ...FONTS.body3,
    fontSize: 14,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: "#1b49ff",
    width: 200,
    height: 62,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: COLORS.white,
    ...FONTS.body3,
    fontSize: 18,
  },
});
