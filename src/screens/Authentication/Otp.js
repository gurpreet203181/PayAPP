import React from "react";
import { t } from "../../hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, dummyData, SIZES } from "../../constants";
import { Button } from "../../components";
import AuthLayout from "./AuthLayout";
import { utils } from "../../utils";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const Otp = ({ route, navigation }) => {
  const email = route.params.email;
  return (
    <AuthLayout
      title={t("authLayout_TitleOtp")}
      subTitle={t("authLayout_Otp_SubTitle")}
      onClosePress={() => navigation.goBack()}
      childern={
        <View style={{ alignItems: "flex-start", height: 300 }}>
          <Text style={Styles.Email}>{email}</Text>

          <Button
            label={t("resendCode")}
            labelStyle={{ ...FONTS.body5, color: COLORS.gray2 }}
            containerStyle={{ marginTop: 16 }}
            onPress={() => console.log("Code resend")}
          />
          <View
            style={{
              marginTop: 52,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <OTPInputView
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={Styles.underlineStyleBase}
              codeInputHighlightStyle={Styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        </View>
      }
      bottomButton={
        <View>
          <Button
            label={t("done")}
            labelStyle={{ ...Styles.OtpText }}
            containerStyle={{ ...Styles.OtpButton, ...Styles.shadow }}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      }
    />
  );
};

export default Otp;

const Styles = StyleSheet.create({
  Email: {
    ...FONTS.body4,
    fontSize: 12,
  },
  underlineStyleBase: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderRadius: SIZES.padding,
    ...FONTS.body1,
    fontSize: 20,
    color: COLORS.black2,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  OtpButton: {
    backgroundColor: COLORS.blue2,
    width: 160,
    height: 56,
    borderRadius: SIZES.padding,
  },
  OtpText: {
    color: COLORS.white,

    ...FONTS.body3,
    fontFamily: "Poppins_500Medium",
  },
});
