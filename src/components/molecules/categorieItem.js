import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "@constants";

const CategorieItem = ({ icon, iconStyle, label, amount, containerStyle }) => {
  return (
    <View
      style={{
        width: 120,
        height: 134,
        borderRadius: 16,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        padding: 15,
        ...containerStyle,
      }}
    >
      <Image source={icon} style={{ height: 24, width: 24, ...iconStyle }} />
      <View style={{ marginTop: 30 }}>
        <Text style={{ color: "#6B7280", ...FONTS.body3, fontSize: 12 }}>
          {label}
        </Text>
        <Text style={{ color: COLORS.darkBlue3, ...FONTS.h2, fontSize: 16 }}>
          {amount}
        </Text>
      </View>
    </View>
  );
};

export default CategorieItem;

const styles = StyleSheet.create({});
