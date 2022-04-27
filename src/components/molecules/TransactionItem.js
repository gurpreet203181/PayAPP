import React from "react";

import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../../constants";

const TransactionItem = ({ item, onPress, containerStyle }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.Container, ...containerStyle }}
      onPress={onPress}
      key={item.key}
    >
      {/* Image , name and date */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* img */}
        <View style={styles.imgContainer}>
          <Image source={item?.profileImage} style={styles.ImgStyle} />
        </View>

        {/* name and date */}
        <View style={styles.nameContainer}>
          <Text
            style={{
              ...FONTS.h4,
              color: "#273240",
              fontSize: 13,
              letterSpacing: 0.3,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: COLORS.black3,
              opacity: 0.5,
              letterSpacing: 0.3,
            }}
          >
            {item?.date}
          </Text>
        </View>
      </View>

      {/* amount and item name */}
      <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
        {item.type === "output" && (
          <Text
            style={{
              ...FONTS.h4,
              color: "#273240",
              fontSize: 13,
              letterSpacing: 0.3,
            }}
          >
            -{item?.amount}
          </Text>
        )}
        {item.type === "input" && (
          <Text
            style={{
              ...FONTS.h4,
              color: "#273240",
              fontSize: 13,
              letterSpacing: 0.3,
            }}
          >
            +{item.amount}
          </Text>
        )}
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.black3,
            opacity: 0.5,
            letterSpacing: 0.3,
          }}
        >
          {item.item}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    ...SIZES.marginHorizontal,
  },

  imgContainer: {
    height: 40,
    width: 40,
    borderRadius: 15,
    backgroundColor: "rgba(50, 167, 226, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  ImgStyle: {
    width: 20,
    height: 20,
  },
  nameContainer: {
    marginLeft: 16,
  },
  amount: {
    ...FONTS.body3,
    color: COLORS.black2,
  },
});

export default TransactionItem;
