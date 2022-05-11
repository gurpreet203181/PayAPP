import React from "react";
import { t } from "@hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { FormInput, Button, LineDivider, CheckBox } from "@components";
import AuthLayout from "./AuthLayout";
import { COLORS, FONTS, dummyData, SIZES, icons } from "@constants";
import { auth } from "@config/firebase";

const SignIn = ({ navigation }) => {
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const signIn = async () => {
    try {
      if (value.email !== "" && value.password !== "") {
        await auth.signInWithEmailAndPassword(value.email, value.password);
      }
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
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

          <LineDivider lineStyle={Styles.LineStyle} />

          <View style={{ marginTop: 28 }}>
            {/* Email */}
            <FormInput
              value={value.email}
              placeholder={t("email")}
              keyboradType="email-address"
              autoCompleteType="email"
              onChange={(text) => {
                setValue({ ...value, email: text });
              }}
              errorMsg={value.error}
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
              secureTextEntry={!showPass}
              errorMsg={value.error}
              autoCompleteType="password"
              contentContainerStyle={{ marginTop: SIZES.radius }}
              onChange={(text) => {
                setValue({ ...value, password: text });
              }}
              prependComponenet={
                <Image
                  source={icons.lock}
                  style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
                />
              }
              forgotButton={
                <Button
                  label={t("restPassword")}
                  labelStyle={{ ...FONTS.body5, color: COLORS.gray2 }}
                  onPress={() => navigation.navigate("ForgotPassword")}
                />
              }
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

            <Text style={Styles.RememberMeText}>{t("rememberMe")}</Text>
          </View>
        </View>
      }
      bottomButton={
        <View>
          <Button
            label={t("signIn")}
            labelStyle={{ ...Styles.SignInText }}
            containerStyle={{ ...Styles.SignInButton, ...Styles.shadow }}
            onPress={() => signIn()}
          />
        </View>
      }
    />
  );
};

export default SignIn;

const Styles = StyleSheet.create({
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
});
