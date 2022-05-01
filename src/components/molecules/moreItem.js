import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FONTS, COLORS, icons, SIZES } from "@constants";
import IconButton from "../atoms/IconButton";

const MoreItem = ({ icon, title, iconStyle, onPress, containerStyle }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        //  width: "100%",
        marginTop: 8,
        ...SIZES.marginHorizontal,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon={icon}
          iconStyle={{
            width: 18,
            height: 18,
            tintColor: COLORS.black,
            ...iconStyle,
          }}
          containerStyle={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "#F9FAFB",
          }}
        />
        <Text
          style={{
            marginLeft: 20,
            ...FONTS.h4,
            fontSize: 14,
            color: "#1D3A70",
            letterSpacing: 0.3,
          }}
        >
          {title}
        </Text>
      </View>
      <Image
        source={icons.right_arrow}
        style={{ tintColor: "#6B7280", width: 16, height: 16 }}
      />
    </TouchableOpacity>
  );
};

export default MoreItem;
