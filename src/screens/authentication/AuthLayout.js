import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "@constants";
import { Loading } from "@components";

//Firbase
import auth from "@react-native-firebase/auth";
import { firebaseAuth, firestoreDb } from "@config/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import Constants from "expo-constants";
import { create_Personal_Wallet } from "../../api/rapyd/walletObject";
import MultistepFormModal from "./MultistepFormModal";
const AuthLayout = ({
  childern,
  title,
  subTitle,
  onClosePress,
  bottomButton,
  screen,
}) => {
  const route = useRoute();
  const [isLoading, SetIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function onGoogleButtonPress() {
    GoogleSignin.configure({
      //  iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
      webClientId:
        "77208043248-ppnlmfqpcshetiejruf6rrr1skc2fg5h.apps.googleusercontent.com",
      //androidClientId: Constants.manifest?.extra?.googleAndroidKey, //From app.json
      //androidStandaloneAppClientId: Constants.manifest?.extra?.googleAndroidKey,
      // androidStandaloneAppClientId: Constants.manifest?.extra?.googleAndroidKey,
      //  iosStandaloneAppClientId: 'IOS_STANDALONE_APP_CLIENT_ID',
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return firebaseAuth
      .signInWithCredential(googleCredential)
      .then((user) => {
        if (user?.additionalUserInfo?.isNewUser) {
          //creating user personal in rapyd
          create_Personal_Wallet(user).then((response) => {
            if (response?.status?.status == "SUCCESS") {
              ewalletId = response?.data?.id;
            }
            //if user is new creating user in database
            firestoreDb.collection("users").doc(user?.user?.uid).set({
              username: user?.user?.displayName,
              email: user?.user?.email,
              firstName: user?.additionalUserInfo?.profile?.given_name,
              lastName: user?.additionalUserInfo?.profile?.family_name,
              profileURL: user?.user?.photoURL,
              phoneNumber: null,
              ewalletId: ewalletId,
            });

            setModalVisible(true);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Google sign in
  //after sign in   onAuthStateChanged method is trigged in useAuthentication.js to make user login in app
  const GoogleSignIn = async () => {
    var ewalletId = "";

    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        //  iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
        androidClientId: Constants.manifest?.extra?.googleAndroidKey, //From app.json
        androidStandaloneAppClientId:
          Constants.manifest?.extra?.googleAndroidKey,
        //  iosStandaloneAppClientId: 'IOS_STANDALONE_APP_CLIENT_ID',
      });
      if (result.type === "success") {
        //setIsLoading(true);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        await firebaseAuth
          .signInWithCredential(credential) //Login to Firebase
          .then((user) => {
            if (user?.additionalUserInfo?.isNewUser) {
              //creating user personal in rapyd
              create_Personal_Wallet(user).then((response) => {
                if (response?.status?.status == "SUCCESS") {
                  ewalletId = response?.data?.id;
                }
                //if user is new creating user in database
                firestoreDb.collection("users").doc(user?.user?.uid).set({
                  username: user?.user?.displayName,
                  email: user?.user?.email,
                  firstName: user?.additionalUserInfo?.profile?.given_name,
                  lastName: user?.additionalUserInfo?.profile?.family_name,
                  profileURL: user?.user?.photoURL,
                  phoneNumber: null,
                  ewalletId: ewalletId,
                });

                setModalVisible(true);
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        SetIsLoading(false);
      }
    } catch ({ message }) {
      console.log("login: Error:" + message);
    }
  };
  //facebook sign in
  //after sign in   onAuthStateChanged method is trigged in useAuthentication.js to make user login in app

  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: Constants.manifest?.extra?.facebookAppId,
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
          behavior: "web",
        });
      if (type === "success") {
        // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebaseAuth
          .signInWithCredential(credential)
          .then((user) => {
            if (user?.additionalUserInfo?.isNewUser) {
              firestoreDb.collection("users").doc(user?.user?.uid).set({
                username: user?.user?.displayName,
                email: user?.user?.email,
                firstName: user?.user?.firstName,
                lastName: user?.user?.lastName,
                profileURL: user?.profileURL,
                phoneNumber: null,
                //getting user googel display name only once for default
                // avater: user?.photoURL,
              });
            }
          })
          .catch((error) => {
            console.log("Error occurred ", error);
          });
      } else {
        SetIsLoading(false);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 30 }}>
          {/* Close button */}
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={Styles.CloseContainer}
              onPress={onClosePress}
            >
              <Image source={icons.close} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>

          {/* Title && subtitle */}
          <View style={Styles.TitleContainer}>
            <Text
              style={{
                ...FONTS.h5,
                fontSize: 24,
                paddingTop: 10,
                color: COLORS.darkBlue3,
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{ ...FONTS.body5, color: COLORS.gray2 }}
              adjustsFontSizeToFit
              numberOfLines={2}
            >
              {subTitle}
            </Text>
          </View>

          {/* Inputs */}
          {childern}

          {/* Social Login && Sign Button */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 80,
            }}
          >
            {/* Social Buttons */}
            {route.name != "ForgotPassword" &&
              route.name != "Otp" &&
              route.name != "EmailVerfication" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  {/* Google */}
                  <TouchableOpacity
                    style={{ ...Styles.SocialBtnFrame }}
                    onPress={() => {
                      onGoogleButtonPress();
                      // SetIsLoading(true);
                    }}
                  >
                    <Image source={icons.google} style={Styles.SocialImg} />
                  </TouchableOpacity>

                  {/* Facebook */}
                  <TouchableOpacity
                    style={{ ...Styles.SocialBtnFrame }}
                    onPress={() => {
                      facebookSignIn();
                      SetIsLoading(true);
                    }}
                  >
                    <Image source={icons.facebook} style={Styles.SocialImg} />
                  </TouchableOpacity>

                  {/* Apple */}
                  {/* <TouchableOpacity style={{ ...Styles.SocialBtnFrame }}>
                  <Image source={icons.apple} style={Styles.SocialImg} />
                </TouchableOpacity> */}
                </View>
              )}

            {/* sign Button */}
            <View style={{ marginTop: 42, paddingBottom: 20 }}>
              {bottomButton}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* select contact model  */}
      <View>
        <MultistepFormModal
          isVisible={isModalVisible}
          closeModel={toggleModal} //useCallBack to get selected contact from modal
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
};

export default AuthLayout;

const Styles = StyleSheet.create({
  CloseContainer: {
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.padding,
    height: 44,
    width: 44,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleContainer: {
    marginTop: 16,
    justifyContent: "flex-start",
  },
  SocialBtnFrame: {
    width: 56,
    height: 56,
    borderColor: COLORS.lightGray2,
    borderWidth: 1,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  SocialImg: {
    width: 24,
    height: 24,
  },
});
