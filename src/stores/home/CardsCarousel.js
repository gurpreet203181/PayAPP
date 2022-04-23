// Inspiration: https://dribbble.com/shots/7378780-Travel-App-Trip-Detail-Animation

import * as React from "react";
import {
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Carditem } from "../../components";
import { SharedElement } from "react-navigation-shared-element";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";

export const ITEM_WIDTH = width * 0.68;
export const SPACING = 20;

const CardsCarousel = ({
  data,
  cardStyle,
  containerStyle,
  cardContainerStyle,
}) => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          ...containerStyle,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          const s = ITEM_WIDTH + SPACING * 2;
          const inputRange = [(index - 1) * s, index * s, (index + 1) * s];
          const imageScale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
            extrapolate: "clamp",
          });
          const headingTranslateX = scrollX.interpolate({
            inputRange,
            outputRange: [width, 0, -width],
            extrapolate: "clamp",
          });
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                margin: SPACING,
                marginBottom: 0,
                overflow: "hidden",
                ...cardContainerStyle,
              }}
              onPress={() => navigation.navigate("CardDetail", { item })}
            >
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <Carditem item={item} />
              </SharedElement>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
export default CardsCarousel;
