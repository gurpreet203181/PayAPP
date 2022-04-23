import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const OnBoardingItem = ({ data }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={data.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={styles.textContainer}>
        <View style={{ width: 250 }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text adjustsFontSizeToFit style={styles.description}>
              {data.description}
            </Text>
          </View>
        </View>
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
    flex: 0.4,
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.3,
    marginTop: 50,
    marginLeft: 30,
    width: "100%",
    alignContent: "flex-start",
    justifyContent: "center",
  },
  title: {
    ...FONTS.h2,
    fontSize: 25,
    marginBottom: 22,
    color: COLORS.black2,
    textAlign: "left",
  },
  description: {
    textAlign: "left",
    color: COLORS.black2,
    ...FONTS.body3,
    fontSize: 18,
  },
});
