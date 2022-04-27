import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { COLORS, SIZE, FONTS, icons } from "@constants";

const SelectedBankItem = ({
  image,
  leftIcon,
  onLeftIconPress,
  title,
  subTitle,
  leftIconStyle,
  imgStyle,
  containerStyle,
}) => {
  return (
    <View style={{ ...styles.box, ...containerStyle }}>
      <Image style={{ width: 47, height: 47, ...imgStyle }} source={image} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title && <Text style={styles.boxTitle}>{title}</Text>}
        {subTitle && <Text style={styles.boxText}>{subTitle}</Text>}
      </View>
      <TouchableOpacity
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: 40,
        }}
        onPress={onLeftIconPress}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: "#9CA3AF",
            ...leftIconStyle,
          }}
          source={leftIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
export default SelectedBankItem;

const styles = StyleSheet.create({
  box: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    height: 80,
    width: 327,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#E5E7EB",
    marginTop: 58,
  },
  boxTitle: {
    ...FONTS.h4,
    fontSize: 16,
    color: "#1D3A70",
  },
  boxText: {
    ...FONTS.body2,
    fontSize: 12,
    color: "#6B7280",
  },
});
