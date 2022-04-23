import React, { useRef, useState } from "react";
import { t } from "../../hooks/UseI18n";
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Image,
  ImageBackground,
} from "react-native";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
import {
  OnBoardingItem,
  Paginator,
  NextButton,
  Button,
} from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import slides from "./slides";
import { color } from "react-native-reanimated";

const OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  //on slide change
  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  //Function to go next slide
  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
  async function setAsyncStorage() {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      {/* logo */}
      <View style={styles.logoContainer}>
        <Image source={images.Logo2} />
      </View>

      {/* Slides */}
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnBoardingItem data={item} />}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.bottomContanier}>
        {/* Pagination */}
        <Paginator data={slides} scrollX={scrollX} />

        {/* next button */}
        {currentIndex < slides.length - 1 && (
          <Button
            onPress={scrollTo}
            label={t("next")}
            labelStyle={styles.buttonLabel}
            containerStyle={{ ...styles.buttonContainer, ...styles.shadow }}
            icon={icons.right_arrow}
            iconStyle={styles.buttonIcon}
            iconPosition="RIGHT"
          />
        )}
        {/* get started button */}
        {currentIndex == slides.length - 1 && (
          <Button
            onPress={() => {
              setAsyncStorage();
              navigation.replace("Welcome");
            }}
            label={t("started")}
            labelStyle={styles.buttonLabel}
            containerStyle={{
              ...styles.buttonContainer,
              ...styles.shadow,
              width: 150,
            }}
          />
        )}
      </View>
      {/* <View style={styles.backgroud}/> */}
    </View>
  );
};
export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 5,
  },
  logoContainer: {
    marginTop: 25,
    width: 40,
    height: 40,
  },
  bottomContanier: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 52,
    paddingHorizontal: 48,
  },
  buttonContainer: {
    width: 120,
    height: 56,
    backgroundColor: COLORS.black2,
    borderRadius: 28,
  },
  buttonLabel: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  buttonIcon: {
    tintColor: COLORS.white,
    marginLeft: 20,
  },
  background: {
    position: "absolute",
    backgroundColor: "#F5F6FA",
    bottom: 0,
    left: 0,
    width: "80%",
    height: "50%",
    borderTopEndRadius: 200,
    borderBottomEndRadius: 200,
  },
});
