import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "@constants";
import { Button, Loading, FormInput } from "@components";
import AuthLayout from "./AuthLayout";

/*summary

after signup 
onAuthStateChanged method  is trigged method in useAuthentication.js to make user login in app
and then in userstack navigatio if user is not verfied it land on this screen else on homescreen

*/

import { auth } from "src/config/firebase";

const EmailVerfication = ({ route, navigation }) => {
  const [codeResend, setCodeResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const user = auth.currentUser;

  //caling send email function to send email on page loading
  useEffect(() => {
    sendEmail();
  }, []);

  //logout function
  const SignOut = async () => {
    try {
      await auth.signOut();

      // onLogoutPress();
    } catch (error) {
      console.log(error);
    }
  };

  //email verfication function
  const sendEmail = async () => {
    try {
      await auth.currentUser.sendEmailVerification().then(() => {
        console.log("sent");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthLayout
        title={t("emailVerfication_Title")}
        subTitle={t("emailVerfication_SubTitle")}
        onClosePress={() => {
          SignOut(); //on close making user sign and direct to welcome screnn
          // navigation.popToTop();
        }}
        childern={
          <View style={{ alignItems: "flex-start", height: 300 }}>
            {codeResend && (
              <Text style={Styles.resendMsg}>{t("resendLinkmsg")}</Text>
            )}
            {error && <Text style={Styles.errorMsg}>{error}</Text>}
            <View style={{ marginTop: 71 }}>
              {/* Email */}
              <FormInput
                value={user?.email}
                placeholder={t("email")}
                keyboradType="email-address"
                autoCompleteType="email"
                editable={false}
                prependComponenet={
                  <Image
                    source={icons.email}
                    style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
                  />
                }
              />
            </View>
            <Button
              label={t("resendEmail")}
              labelStyle={{ ...FONTS.body5, color: COLORS.gray2 }}
              containerStyle={{ marginTop: 24 }}
              onPress={() => {
                sendEmail();
                setCodeResend(true);
              }}
            />
          </View>
        }
        bottomButton={
          <View>
            <Button
              label={t("done")}
              labelStyle={{ ...Styles.OtpText }}
              containerStyle={{ ...Styles.OtpButton, ...Styles.shadow }}
              onPress={() => {
                auth.currentUser.reload().then(() => {
                  const user = auth.currentUser;
                  user?.emailVerified
                    ? navigation.replace("Tabs")
                    : setError(t("emailVerficationErrorMsg"));
                });
              }}
            />
          </View>
        }
      />
      {loading && <Loading />}
    </View>
  );
};

export default EmailVerfication;

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
