import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "@constants";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const NotificationItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* logo */}
      <View style={styles.imgContanier}>
        <Image source={icons.cvv} style={styles.img} />
      </View>

      <View
        style={{
          width: "70%",
          marginLeft: 16,
        }}
      >
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name}>
          {item?.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </View>
      <Text style={styles.date}>{"33/21/22"}</Text>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: 327,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imgContanier: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white3,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 22,
    height: 22,
    tintColor: "#AB92F0",
  },
  name: {
    ...FONTS.h5,
    fontSize: 16,
    color: COLORS.darkBlue3,
  },
  description: {
    ...FONTS.body3,
    fontSize: 12,
    color: COLORS.lightGray3,
    marginTop: 4,
    width: "95%",
  },
  date: {
    ...FONTS.body3,
    fontSize: 12,
    color: COLORS.lightGray3,
  },
});
