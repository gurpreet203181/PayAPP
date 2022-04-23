import React from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const Header = ({
  title,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  containStyle,
  rightIconStyle,
  leftIconStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, containStyle]}>
      {/* left Icon */}
      <TouchableOpacity onPress={onLeftIconPress}>
        <Image
          source={leftIcon}
          style={{ height: 18, width: 18, ...leftIconStyle }}
        />
      </TouchableOpacity>

      {/* title */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{
            ...FONTS.h3,
            letterSpacing: 0.3,
            color: COLORS.black2,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </View>

      {/* right Icon */}
      <TouchableOpacity onPress={onRightIconPress}>
        <Image
          source={rightIcon}
          style={{ height: 18, width: 18, ...rightIconStyle }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...SIZES.marginHorizontal,
    marginTop: 16,
  },
});

export default Header;
