import React from "react";
import { t } from "../../hooks/UseI18n";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Button } from "../../components";
import { COLORS, FONTS, dummyData, SIZES, images } from "../../constants";
import SVGImg from "@assets/images/whiteLogo.svg";

const Welcome = ({ navigation }) => {
  /*const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log(error);
    }
  };*/
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ImageBackground
        source={images.WelcomeShape}
        resizeMode="cover"
        style={styles.BackgroudImage}
      >
        <View style={{ marginLeft: 40, marginTop: 50 }}>
          <SVGImg width={100} height={100} />
          <Text style={{ marginTop: 20, ...styles.logoText }}>
            {t("welcome")}
          </Text>
        </View>
      </ImageBackground>
      {/* Button sigin && sigUP */}
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          alignSelf: "center",
          bottom: 57,
          flex: 0.4,
        }}
      >
        <Button
          label={t("signUp")}
          labelStyle={{ color: COLORS.white, ...styles.btnLabel }}
          containerStyle={{
            backgroundColor: COLORS.darkBlue3,
            ...styles.BtnContainer,
          }}
          onPress={() => navigation.navigate("SignUp")}
        />

        <Button
          label={t("signIn")}
          labelStyle={{ color: COLORS.black2, ...styles.btnLabel }}
          containerStyle={{
            backgroundColor: COLORS.white,
            marginTop: 20,
            ...styles.BtnContainer,
          }}
          onPress={() => navigation.navigate("SignIn")}
        />
        <View
          style={{
            width: 134,
            height: 5,
            backgroundColor: COLORS.black2,
            borderRadius: 100,
            marginTop: 50,
          }}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  BtnContainer: {
    width: 327,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.darkBlue3,
  },
  btnLabel: {
    ...FONTS.h4,
    fontSize: 15,
  },
  BackgroudImage: {
    width: "100%",
    height: "90%",
    flex: 0.7,
  },
  logo: {
    height: 60,
    width: 60,
  },
  logoText: {
    color: COLORS.white,
    ...FONTS.body1,
  },
});
