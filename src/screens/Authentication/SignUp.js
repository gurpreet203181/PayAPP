import React from "react";
import { t } from "../../hooks/UseI18n";
import { FormInput, Button, CheckBox } from "../../components";
import { View, Image, Text, StyleSheet } from "react-native";
import AuthLayout from "./AuthLayout";
import { utils } from "../../utils";
import { COLORS, FONTS, dummyData, SIZES, icons } from "../../constants";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [showPass, setShowPass] = React.useState(false);

  const [policyChecked, setPolicyChecked] = React.useState(false);

  function isEnableSignUP() {
    return (
      email != "" &&
      username != "" &&
      password != "" &&
      emailError == "" &&
      passwordError == "" &&
      usernameError == ""
    );
  }

  return (
    <AuthLayout
      title={t("authLayout_Title")}
      subTitle={t("authLayout_SignUp_SubTitle")}
      onClosePress={() => navigation.navigate("Welcome")}
      childern={
        <View>
          {/* Email */}
          <FormInput
            value={email}
            placeholder={t("email")}
            keyboradType="email-address"
            autoCompleteType="email"
            onChange={(value) => {
              utils.validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            prependComponenet={
              <Image
                source={icons.email}
                style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
              />
            }
          />
          {/* Name */}

          <FormInput
            value={username}
            placeholder={t("username")}
            containStyle={{
              marginTop: SIZES.radius,
            }}
            onChange={(value) => {
              setUsername(value);
            }}
            errorMsg={usernameError}
            prependComponenet={
              <Image
                source={icons.user}
                style={{ width: 27, height: 27, tintColor: COLORS.black2 }}
              />
            }
          />

          {/* Password */}
          <FormInput
            value={password}
            placeholder={t("password")}
            secureTextEntry={!showPass}
            errorMsg={passwordError}
            autoCompleteType="password"
            contentContainerStyle={{ marginTop: SIZES.radius }}
            onChange={(value) => {
              utils.validatePassword(value, setPasswordError);
              setPassword(value);
            }}
            prependComponenet={
              <Image
                source={icons.lock}
                style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
              />
            }
          />

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={Styles.PasswordRulesText}
          >
            {t("passwordRules")}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 39,
            }}
          >
            <CheckBox
              value={policyChecked}
              onChange={(value) => setPolicyChecked(value)}
            />

            <Text style={Styles.policyText}>{t("policyText")}</Text>
          </View>
        </View>
      }
      bottomButton={
        <View>
          <Button
            label={t("signUp")}
            labelStyle={{ ...Styles.SignUpText }}
            containerStyle={{ ...Styles.SignUpButton, ...Styles.shadow }}
            onPress={() => navigation.navigate("Otp", { email: email })}
          />
        </View>
      }
    />
  );
};

export default SignUp;

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
  policyText: {
    marginLeft: 8,
    ...FONTS.body5,
  },
  SignUpButton: {
    backgroundColor: COLORS.blue2,
    width: 160,
    height: 56,
    borderRadius: SIZES.padding,
  },
  SignUpText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontFamily: "Poppins_500Medium",
  },
});
