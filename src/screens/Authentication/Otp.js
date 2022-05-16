import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, dummyData, SIZES } from "@constants";
import { Button, Loading } from "@components";
import AuthLayout from "./AuthLayout";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  checkVerification,
  sendSmsVerification,
} from "../../api/twilio/verify";
import { auth, firestoreDb } from "src/config/firebase";

const Otp = ({ route, navigation }) => {
  const phoneNumber = route?.params?.phoneNumber;
  const [invalidCode, setInvalidCode] = useState(false);
  const [codeResend, setCodeResend] = useState(false);
  const [loading, setLoading] = useState(false);

  //updating db with new or first phone number after user verfied his phone number
  const updateDb = async () => {
    const currentUser = auth.currentUser;

    await firestoreDb.collection("users").doc(currentUser?.uid).update({
      phoneNumber: phoneNumber,
    });
  };
  //code verfication function
  const checkCode = (code) => {
    setLoading(true);
    try {
      //calling twilio api in checkverification function with number and  otp
      checkVerification(phoneNumber, code).then((response) => {
        if (response.success) {
          //if success is true than updating user database with phonenumber
          updateDb().then(() => navigation.replace("AccountInfo"));
        } else {
          setLoading(false);
          setInvalidCode(true);
        }
      });
    } catch (error) {
      setLoading(false);

      console.log(error.message);
    }
  };

  //resend function
  const sendSms = () => {
    if (phoneNumber.length > 3) {
      setLoading(true);
      sendSmsVerification(phoneNumber).then((response) => {
        if (response.success) {
          setLoading(false);
          setCodeResend(true);
          setInvalidCode(false);
        }
      });
    } else {
      setLoading(false);
      setInvalidCode(true);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthLayout
        title={t("authLayout_TitleOtp")}
        subTitle={t("authLayout_Otp_SubTitle")}
        onClosePress={() => navigation.navigate("AccountInfo")}
        childern={
          <View style={{ alignItems: "flex-start", height: 300 }}>
            <Text style={Styles.Email}>{phoneNumber}</Text>
            {codeResend && (
              <Text style={Styles.resendMsg}>{t("resendCodeMsg")}</Text>
            )}
            {invalidCode && (
              <View>
                <Text style={Styles.errorMsg}>{t("errorCodeMsg")}</Text>
              </View>
            )}

            {!codeResend && (
              <Button
                label={t("resendCode")}
                labelStyle={{ ...FONTS.body5, color: COLORS.gray2 }}
                containerStyle={{ marginTop: 16 }}
                onPress={sendSms}
              />
            )}

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
                  checkCode(code); //on code fill  checkcode function is called
                }}
              />
            </View>
          </View>
        }
        /*   bottomButton={
        <View>
          <Button
            label={t("done")}
            labelStyle={{ ...Styles.OtpText }}
            containerStyle={{ ...Styles.OtpButton, ...Styles.shadow }}
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      }*/
      />
      {loading && <Loading />}
    </View>
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
    color: COLORS.darkBlue3,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  OtpButton: {
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 16,
  },
  OtpText: { color: COLORS.white, ...FONTS.h4, fontSize: 15 },
  errorMsg: {
    paddingTop: 20,
    textAlign: "center",
    color: COLORS.red,
    ...FONTS.body5,
  },
  resendMsg: {
    paddingTop: 20,
    textAlign: "center",
    color: COLORS.green,
    ...FONTS.body5,
  },
});
