import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { COLORS, images, SIZES } from "../../constants";

const ProfileButton = ({ icon, iconStyle, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: SIZES.padding,
        overflow: "hidden",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon ? { uri: icon } : images.boy}
        style={{
          marginTop: icon ? 0 : 10,
          height: 40,
          width: 40,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};
export default ProfileButton;
