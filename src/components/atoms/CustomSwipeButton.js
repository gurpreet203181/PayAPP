import React from "react";
import { View, Image } from "react-native";
import SwipeButton from "rn-swipe-button";
import { icons, COLORS } from "@constants";
const CustomSwipeButton = ({ title, onSwipeSuccess, IconComponent }) => {
  //swipe thumb icon component
  const ButtonIconComponent = () => {
    return (
      <Image
        source={icons.right_arrow}
        style={{ width: 20, height: 20, tintColor: COLORS.purple }}
      />
    );
  };
  return (
    <View>
      <SwipeButton
        disabled={false}
        swipeSuccessThreshold={100}
        height={64}
        width={315}
        title={title}
        titleColor="white"
        titleFontSize={15}
        shouldResetAfterSuccess={false}
        onSwipeSuccess={onSwipeSuccess}
        railBackgroundColor={COLORS.purple}
        railBorderColor={COLORS.purple}
        railFillBackgroundColor={"rgba(0,0,128, 0.3)"}
        railFillBorderColor={"rgba(0,0,128, 0.3)"}
        thumbIconBackgroundColor={COLORS.white}
        thumbIconBorderColor={COLORS.purple}
        thumbIconComponent={IconComponent ? IconComponent : ButtonIconComponent}
      />
    </View>
  );
};

export default CustomSwipeButton;
