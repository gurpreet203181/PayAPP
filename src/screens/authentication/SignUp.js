import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { FormInput, Button, CheckBox } from "@components";
import { View, Image, Text, StyleSheet } from "react-native";
import AuthLayout from "./AuthLayout";
import { utils } from "../../utils";
import { COLORS, FONTS, dummyData, SIZES, icons } from "@constants";
import { firebaseAuth, firestoreDb } from "@config/firebase";
import { create_Personal_Wallet } from "../../api/rapyd/walletObject";

const SignUp = ({ navigation }) => {
  const [value, setValue] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [showPass, setShowPass] = React.useState(false);
  const [policyChecked, setPolicyChecked] = React.useState(false);

  //sign up function

  const signUp = async () => {
    var ewalletId = "";

    try {
      if (utils.validateCredentials(value, setError, policyChecked)) {
        await firebaseAuth
          .createUserWithEmailAndPassword(value.email, value.password)
          .then((user) => {
            if (user?.additionalUserInfo?.isNewUser) {
              //creating user personal in rapyd
              create_Personal_Wallet(user, value).then((response) => {
                if (response?.status?.status == "SUCCESS") {
                  ewalletId = response?.data?.id;
                }
                //after sign up user as created in database and
                // trigger onAuthStateChanged method in useAuthentication.js to make user login in app

                firestoreDb.collection("users").doc(user?.user?.uid).set({
                  uid: user?.user?.uid,
                  email: value.email.trim(),
                  username: value.username.trim(),
                  firstName: value.firstName.trim(),
                  lastName: value.lastName.trim(),
                  phoneNumber: null,
                  profileURL: null,
                  ewalletId: ewalletId,
                  customerId: "",
                  country: "",
                  fcmToken: [],
                  currency: null,
                });
              });
            }
          });
      }
    } catch (error) {
      console.log(error);
      setError(t("userExists"));
    }
  };

  return (
    <AuthLayout
      title={t("authLayout_Title")}
      subTitle={t("authLayout_SignUp_SubTitle")}
      onClosePress={() => navigation.navigate("Welcome")}
      childern={
        <View>
          {/* Error message */}
          <Text style={styles.erroMsg}>{error}</Text>
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
          {/* Name */}
          <FormInput
            value={value.firstName.toLowerCase()}
            placeholder={t("firstName")}
            containStyle={{
              marginTop: SIZES.radius,
            }}
            onChange={(text) => {
              setValue({ ...value, firstName: text });
              setError("");
            }}
            // errorMsg={value.error}
            prependComponenet={
              <Image
                source={icons.user}
                style={{ width: 27, height: 27, tintColor: COLORS.black2 }}
              />
            }
          />
          {/* {lastname} */}
          <FormInput
            value={value.lastName.toLowerCase()}
            placeholder={t("lastName")}
            containStyle={{
              marginTop: SIZES.radius,
            }}
            onChange={(text) => {
              setValue({ ...value, lastName: text });
              setError("");
            }}
            // errorMsg={value.error}
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
            //errorMsg={value.error}
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

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.PasswordRulesText}
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

            <Text style={styles.policyText}>{t("policyText")}</Text>
          </View>
        </View>
      }
      bottomButton={
        <View>
          <Button
            label={t("signUp")}
            labelStyle={{ ...styles.SignUpText }}
            containerStyle={{ ...styles.SignUpButton, ...styles.shadow }}
            onPress={() =>
              //navigation.navigate("Otp", { email: email })

              //after signup in firbase authentication onAuthStateChanged listener get triggred (in file useAuthentication)
              // and it change navigation stack in index.js if naviagtion folder
              signUp()
            }
          />
        </View>
      }
    />
  );
};

export default SignUp;

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
  erroMsg: {
    paddingTop: 20,
    textAlign: "center",
    color: COLORS.red,
    ...FONTS.body5,
  },
});
