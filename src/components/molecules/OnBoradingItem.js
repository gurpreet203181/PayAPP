import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { t } from "@hooks/UseI18n";

const OnBoardingItem = ({ data }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={data.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ width: 320, alignItems: "center" }}>
        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
          {t(data.title)}
        </Text>
        <Text style={styles.description}>{t(data.description)}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    ...FONTS.h3,
    fontSize: 35,
    color: COLORS.darkBlue3,
    marginTop: 34,
    lineHeight: 38,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginTop: 18,
    color: "#878787",
    ...FONTS.h3,
    fontSize: 13,
  },
});
