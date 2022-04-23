import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../../constants";

const CheckBox = ({
  value,
  onChange,
  containerStyle,
  CheckBoxStyle,
  label,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onChange?.(!value)}>
      <View
        style={{ flexDirection: "row", alignSelf: "center", ...containerStyle }}
      >
        {/* CheckBox */}
        <View
          style={{
            ...styles.CheckBox,
            backgroundColor: value ? "#259CD5" : COLORS.lightGray2,
            ...CheckBoxStyle,
          }}
        >
          {value && (
            <Image source={icons.checked} style={styles.CheckBoxIcon} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CheckBox;

const styles = StyleSheet.create({
  CheckBox: {
    width: 24,
    height: 24,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  CheckBoxIcon: {
    width: 10,
    height: 10,
    tintColor: COLORS.white,
  },
});
