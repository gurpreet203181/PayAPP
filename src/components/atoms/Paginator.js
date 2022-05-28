import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import { COLORS } from "../../constants";

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row" }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const doWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 10, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#8EDFEB", COLORS.darkBlue3, "#8EDFEB"],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: doWidth,
                //  opacity,
                backgroundColor,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.darkBlue3,
    marginHorizontal: 16,
  },
});
