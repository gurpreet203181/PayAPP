import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const SearchBar = (props) => {
  return (
    <View style={styles.searchBarContanier}>
      <View style={{ flexDirection: "row" }}>
        <Feather name="search" size={24} color={COLORS.darkBlue3} />

        <TextInput
          style={styles.TextInput}
          placeholder={props?.placeHolder}
          // value={props.searchPhrase}
          onChangeText={(value) => props?.onChangeText(value)}
          autoCorrect={false}
          underlineColorAndroid="white"
          autoFocus={props?.autoFocus}
          onFocus={() => {
            props?.onFocus();
          }}
        />
      </View>
      {props?.clicked && (
        <TouchableOpacity
          style={{
            height: 50,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            //  props.onChangeText("");
            Keyboard.dismiss();
            props?.setClicked(false);
            props?.onArrowPress?.();
          }}
        >
          <EvilIcons name="arrow-right" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContanier: {
    width: 315,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E7E7F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  TextInput: {
    marginLeft: 10,
    width: "80%",
    ...FONTS.body5,
    fontSize: 13,
  },
});
