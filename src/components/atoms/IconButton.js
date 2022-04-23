import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { FONTS, COLORS } from "../../constants";

const IconButton = ({ icon, iconStyle, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image source={icon} style={{ ...style.imgStyle, ...iconStyle }} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  imgStyle: {
    // marginLeft:5,
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
});
export default IconButton;
