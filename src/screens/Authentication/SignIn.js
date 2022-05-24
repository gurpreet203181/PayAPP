import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { FormInput, Button, LineDivider, CheckBox } from "@components";
import AuthLayout from "./AuthLayout";
import { COLORS, FONTS, dummyData, SIZES, icons } from "@constants";
import { auth } from "@config/firebase";
import { utils } from "../../utils";
const SignIn = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const signIn = async () => {
    try {
      if (utils.isValidEmail(value.email) && value.password.length > 6) {
        await auth.signInWithEmailAndPassword(value.email, value.password);
      } else setError(t("errorMsg"));
    } catch (error) {
      setError(t("errorMsg"));
    }
  };

  return (
    <AuthLayout
      title={t("authLayout_TitleSignIn")}
      subTitle={t("authLayout_SignIn_SubTitle")}
      onClosePress={() => navigation.navigate("Welcome")}
      childern={
        <View>
          {/* LineDivider */}

          <LineDivider lineStyle={styles.LineStyle} />
          <Text style={styles.erroMsg}>{error}</Text>
          <View style={{ marginTop: 28 }}>
            {/* Email */}
            <FormInput
              value={value.email}
              placeholder={t("email")}
              keyboradType="email-address"
              autoCompleteType="email"
              onChange={(text) => {
                setValue({ ...value, email: text });
                setError("");
              }}
              // errorMsg={value.error}
              prependComponenet={
                <Image
                  source={icons.email}
                  style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
                />
              }
            />
            {/* Password */}

            <FormInput
              value={value.password}
              placeholder={t("password")}
              secureTextEntry={showPass}
              // errorMsg={value.error}
              autoCompleteType="password"
              contentContainerStyle={{ marginTop: SIZES.radius }}
              onChange={(text) => {
                setValue({ ...value, password: text });
                setError("");
              }}
              prependComponenet={
                <Image
                  source={icons.lock}
                  style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
                />
              }
            />

            <Button
              containerStyle={{ marginTop: 10, alignSelf: "flex-end" }}
              label={t("restPassword")}
              labelStyle={{ ...FONTS.body5, color: COLORS.gray2 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </View>
          {/* remmber me  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 44,
            }}
          >
            <CheckBox
              value={rememberMe}
              onChange={(value) => setRememberMe(value)}
            />

            <Text style={styles.RememberMeText}>{t("rememberMe")}</Text>
          </View>
        </View>
      }
      bottomButton={
        <View>
          <Button
            label={t("signIn")}
            labelStyle={{ ...styles.SignInText }}
            containerStyle={{ ...styles.SignInButton, ...styles.shadow }}
            onPress={() => signIn()}
          />
        </View>
      }
    />
  );
};

export default SignIn;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 5,
  },
  PasswordRulesText: {
    marginTop: 8,
    color: COLORS.gray2,
    ...FONTS.body5,
  },

  SignInButton: {
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 16,
  },
  SignInText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontSize: 15,
  },
  LineStyle: {
    marginTop: 77,
    height: 1,
    color: COLORS.darkGray2,
  },
  RememberMeText: {
    marginLeft: 8,
    ...FONTS.body5,
    color: COLORS.gray2,
  },
  erroMsg: {
    paddingTop: 20,
    textAlign: "center",
    color: COLORS.red,
    ...FONTS.body5,
  },
});
