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

const OnBoarding = ({ route }) => {
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
      <View style={{ flex: 0.9 }}>
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
      <View style={{ alignItems: "center", flex: 0.3, marginTop: 20 }}>
        {/* Pagination */}
        <Paginator data={slides} scrollX={scrollX} />

        {/* next button */}
        {currentIndex < slides.length - 1 && (
          <Button
            onPress={scrollTo}
            label={t("continue")}
            containerStyle={styles.button}
            labelStyle={styles.buttonLabel}
          />
        )}
        {/* get started button */}
        {currentIndex == slides.length - 1 && (
          <Button
            onPress={() => {
              setAsyncStorage();
              route?.params?.setViewedOnboarding(true);
            }}
            label={t("started")}
            containerStyle={styles.button}
            labelStyle={styles.buttonLabel}
          />
        )}
      </View>
    </View>
  );
};
export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    width: 200,
    height: 59,
    backgroundColor: COLORS.darkBlue3,
    borderRadius: 20,
    marginTop: 25,
  },
  buttonLabel: {
    ...FONTS.h4,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.white,
  },
});
