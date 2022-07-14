import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Image, Text, StyleSheet } from "react-native";
import { FormInput, Button } from "@components";
import { COLORS, FONTS, SIZES, icons, images } from "@constants";
import AuthLayout from "./AuthLayout";
import { utils } from "../../utils";
import { firebaseAuth } from "src/config/firebase";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

const ForgotPassword = ({ navigation, route }) => {
  const loggedUserEmail = route?.params?.email;
  const [email, setEmail] = useState(loggedUserEmail);
  const [emailError, setEmailError] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  //resetMethod
  const resetPassword = async (email) => {
    try {
      if (utils.isValidEmail(email)) {
        await firebaseAuth.sendPasswordResetEmail(email).then(() => {
          setIsVisible(true);
        });
      } else setEmailError(t("emailNotValid"));
    } catch (error) {
      setEmailError(error.message);
    }
  };

  //render
  function renderLottieNfc() {
    return (
      <LottieView
        source={images.emailSent}
        autoPlay
        loop={false}
        //  speed={2}
        style={{
          width: "100%",
          height: 210,
          alignSelf: "center",
        }}
      />
    );
  }

  const ResetConfirmationModal = () => {
    return (
      <Modal
        isVisible={isVisible}
        //onBackButtonPress={closeModel} //onClosepress function to close model by changes isvisible value
        //onBackdropPress={closeModel}
        useNativeDriver={true}
        propagateSwipe
        style={styles.modalView}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center",
              ...SIZES.marginHorizontal,
            }}
          >
            {renderLottieNfc()}
            <Text style={styles.successText}>{t("checkEmail")}</Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={styles.successText2}
            >
              {t("resetConfirmation")}
            </Text>
            <Text style={{ color: COLORS.darkBlue3 }}>{email}</Text>
          </View>

          <View style={{ ...SIZES.marginHorizontal }}>
            <Button
              label={t("procced")}
              containerStyle={styles.buttonContainer}
              labelStyle={styles.buttonLabel}
              onPress={() => {
                loggedUserEmail
                  ? navigation.goBack()
                  : navigation.navigate("SignIn");
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthLayout
        title={t("authLayout_TitleForgotPass")}
        subTitle={t("authLayout_ForgotPass_SubTitle")}
        onClosePress={() => navigation.goBack()}
        childern={
          <View style={{ marginTop: 71 }}>
            {/* Email */}
            <FormInput
              value={email}
              placeholder={t("email")}
              keyboradType="email-address"
              autoCompleteType="email"
              editable={loggedUserEmail ? false : true}
              onChange={(value) => {
                setEmail(value);
                setEmailError();
              }}
              errorMsg={emailError}
              prependComponenet={
                <Image
                  source={icons.email}
                  style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
                />
              }
            />
          </View>
        }
        bottomButton={
          <View style={{ paddingBottom: 20 }}>
            <Button
              label={t("reset")}
              labelStyle={{ ...styles.ForgotText }}
              containerStyle={{ ...styles.ForgotButton, ...styles.shadow }}
              onPress={() => resetPassword(email)}
            />
          </View>
        }
      />
      <ResetConfirmationModal />
    </View>
  );
};

export default ForgotPassword;

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

  ForgotButton: {
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 15,
  },
  ForgotText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  modalView: {
    margin: 0,
  },
  successText: {
    marginTop: 40,
    ...FONTS.h4,
    letterSpacing: 0.3,
    fontSize: 20,
  },
  successText2: {
    ...FONTS.body3,
    fontSize: 14,
    color: COLORS.black,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
