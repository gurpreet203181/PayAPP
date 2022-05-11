import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { FormInput, Button, CheckBox } from "@components";
import { View, Image, Text, StyleSheet } from "react-native";
import AuthLayout from "./AuthLayout";
import { utils } from "../../utils";
import { COLORS, FONTS, dummyData, SIZES, icons } from "@constants";

import { auth, firestoreDb } from "@config/firebase";

const SignUp = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    error: "",
  });
  const [showPass, setShowPass] = React.useState(false);

  const [policyChecked, setPolicyChecked] = React.useState(false);

  const signUp = async () => {
    try {
      if (value.email !== "" && value.password !== "") {
        await auth
          .createUserWithEmailAndPassword(value.email, value.password)
          .then((user) => {
            if (user?.additionalUserInfo?.isNewUser) {
              firestoreDb.collection("users").doc(user?.user?.uid).set({
                username: value.username,
                // avater: user?.photoURL,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
    /*  if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }*/
  };

  return (
    <AuthLayout
      title={t("authLayout_Title")}
      subTitle={t("authLayout_SignUp_SubTitle")}
      onClosePress={() => navigation.navigate("Welcome")}
      childern={
        <View>
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
          {/* Name */}

          <FormInput
            value={value.username}
            placeholder={t("username")}
            containStyle={{
              marginTop: SIZES.radius,
            }}
            onChange={(text) => {
              setValue({ ...value, username: text });
            }}
            errorMsg={value.error}
            prependComponenet={
              <Image
                source={icons.user}
                style={{ width: 27, height: 27, tintColor: COLORS.black2 }}
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
            onPress={() =>
              //navigation.navigate("Otp", { email: email })
              signUp()
            }
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
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 16,
  },
  SignUpText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontSize: 15,
  },
});
