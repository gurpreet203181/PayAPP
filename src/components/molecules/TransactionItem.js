import React from "react";

import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";

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
              ...FONTS.h5,
              color: COLORS.darkBlue3,
              fontSize: 14,
              letterSpacing: 0.3,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              ...FONTS.body2,
              fontSize: 12,
              color: COLORS.lightGray3,
              letterSpacing: 0.3,
            }}
          >
            {item?.item}
          </Text>
        </View>
      </View>

      {/* amount  */}
      <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
        {/* input amount */}
        {item.type == "input" ? (
          <Text style={{ ...styles.amount, color: "#1DAB87" }}>
            + {item.amount}
          </Text>
        ) : (
          // output name
          <Text style={{ ...styles.amount }}>- {item.amount}</Text>
        )}
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
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: COLORS.white3,
    justifyContent: "center",
    alignItems: "center",
  },
  ImgStyle: {
    width: 22,
    height: 22,
  },
  nameContainer: {
    marginLeft: 16,
  },
  amount: {
    ...FONTS.h5,
    fontSize: 14,
    color: COLORS.darkBlue3,
  },
});

export default TransactionItem;
