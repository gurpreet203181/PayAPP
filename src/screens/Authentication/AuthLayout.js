import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "@constants";
import { Loading } from "@components";
//Google login
import * as Google from "expo-google-app-auth";
//facebook login
import * as Facebook from "expo-facebook";

//Firbase
import firebase from "firebase";
import { auth, firestoreDb } from "@config/firebase";

import Constants from "expo-constants";

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

  //Google sign in
  const GoogleSignIn = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        //  iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
        androidClientId: Constants.manifest?.extra?.googleAndroidKey, //From app.json
      });
      if (result.type === "success") {
        //setIsLoading(true);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        await auth
          .signInWithCredential(credential) //Login to Firebase
          .then((user) => {
            if (user?.additionalUserInfo?.isNewUser) {
              firestoreDb.collection("users").doc(user?.user?.uid).set({
                username: user?.user?.displayName, //getting user googel display name only once for default
                // avater: user?.photoURL,
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
  //faceboom sign in
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
        auth
          .signInWithCredential(credential)
          .then((user) => {
            console.log("Logged in successfully", user);
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
                      GoogleSignIn();
                      SetIsLoading(true);
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
