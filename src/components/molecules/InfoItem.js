import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

import { LineDivider } from "../../components";
const InfoItem = ({ icon, label, value }) => {
  return (
    <View style={{ marginTop: 32 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.ImgContainer}>{icon}</View>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
      <LineDivider
        lineStyle={{ height: 0.5, color: "#E7E7F7", marginTop: 32 }}
      />
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  ImgContainer: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.orange2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  label: {
    ...FONTS.body5,
    color: COLORS.black2,
    opacity: 0.5,
    letterSpacing: 0.3,
  },
  value: {
    ...FONTS.body5,
    fontSize: 14,
    color: COLORS.black2,
    letterSpacing: 0.3,
  },
});
