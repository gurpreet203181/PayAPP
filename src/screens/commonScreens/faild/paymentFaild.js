import React from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { COLORS, FONTS, SIZES } from "@constants";
import { Button } from "@components";
import LottieView from "lottie-react-native";

const PaymentSuccess = ({ route, navigation }) => {
  const lottie = route.params?.lottie;
  const defaultLottie = require("@assets/images/fail1.json");
  React.useEffect(() => {
    //backhandler to disable back button on device so user can't go back from  success screen
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
  function renderLottieNfc() {
    return (
      <LottieView
        source={lottie ? lottie : defaultLottie}
        autoPlay
        loop={false}
        //  speed={2}
        style={{
          width: "100%",
          height: lottie ? null : 210,
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
        <Text style={styles.successText}>{t("paymentFaild")}</Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          style={styles.successText2}
        >
          {t("paymentFailInfoText")}
        </Text>
      </View>

      <View style={{ ...SIZES.marginHorizontal }}>
        <Button
          label={t("procced")}
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate("Tabs")}
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
    color: COLORS.black,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: COLORS.darkBlue3,
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
