import React from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import { FONTS, icons, SIZES, images, COLORS } from "../../constants";

const HomeCardItem = ({ item, containerStyle }) => {
  return (
    <ImageBackground
      source={item.image}
      style={{
        height: 276,
        width: "100%",
        marginTop: SIZES.radius,
        borderRadius: 20,
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      {/* nfc image */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <Text style={styles.number}>{item.name}</Text>
        <Image
          source={icons.contactless}
          style={{ tintColor: COLORS.white, width: 32, height: 32 }}
        />
      </View>

      {/* name */}
      <View style={{ marginLeft: 20, marginTop: 75 }}>
        <Text style={styles.text}>{t("number")}</Text>
        <Text style={styles.number}>**** {item.number}</Text>
      </View>
      {/* logo  and expiry*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <Image
          source={item.icon}
          style={{
            tintColor: COLORS.white,
            opacity: 0.9,
            width: 48,
            height: 48,
          }}
        />
        {/* expiry */}
        <View>
          <Text style={styles.text}>{t("expires")}</Text>
          <Text style={{ ...styles.number, fontSize: 12 }}>{item.exp}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCardItem;

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
  text: {
    ...FONTS.body3,
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.6,
  },
  number: {
    ...FONTS.h4,
    fontSize: 16,
    color: COLORS.white,
  },
});
