import React from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import { FONTS, icons, SIZES, images, COLORS } from "../../constants";
const CardItem = ({ item, containerStyle }) => {
  return (
    <ImageBackground
      source={item?.image}
      style={{
        height: 174,
        width: "100%",
        marginTop: SIZES.radius,
        borderRadius: 6,
        overflow: "hidden",
        ...styles.shadow,
        ...containerStyle,
      }}
    >
      {/* logo and 3dots*/}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={{ tintColor: COLORS.white, height: 40, width: 40 }}
        />

        <Image
          source={icons?.option}
          style={{ width: 24, height: 24, tintColor: COLORS.white }}
        />
      </View>

      {/* card last number */}

      <View
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            letterSpacing: 5,
            ...FONTS.h4,
            fontSize: 15,
          }}
        >
          **** **** **** {item?.number}
        </Text>
      </View>

      {/* Details */}

      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* CardHolder */}
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body6,
              letterSpacing: 0.3,
              opacity: 0.8,
              textTransform: "uppercase",
            }}
          >
            {t("cardHolder")}
          </Text>
          <Text
            style={{
              flex: 1,
              color: COLORS.white,
              ...FONTS.body3,
              fontSize: 15,
            }}
          >
            {item?.name}
          </Text>
        </View>
        {/* Expires */}
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body6,
              letterSpacing: 0.3,
              opacity: 0.8,
              textTransform: "uppercase",
            }}
          >
            {t("expires")}
          </Text>
          <Text
            style={{
              flex: 1,
              color: COLORS.white,
              ...FONTS.body3,
              fontSize: 15,
            }}
          >
            {item?.exp}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 24,
  },
});
