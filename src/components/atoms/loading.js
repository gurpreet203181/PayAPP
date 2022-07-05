import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS, FONTS } from "@constants";
import { Text } from "react-native";
const Loading = ({
  containerStyle,
  lottieSrc = require("../../assets/images/loading.json"),
  lottieSpeed = 2,
}) => {
  function renderLottie() {
    return (
      <LottieView
        source={lottieSrc}
        autoPlay
        loop={true}
        speed={lottieSpeed}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
          marginBottom: "20%",
        }}
      />
    );
  }
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.transparentBlack1,
        ...containerStyle,
      }}
    >
      <Text
        style={{
          ...FONTS.h2,
          fontSize: 14,
          color: COLORS.darkBlue3,
        }}
      >
        Zemmo Pay
      </Text>
      {renderLottie()}
    </View>
  );
};

export default Loading;
