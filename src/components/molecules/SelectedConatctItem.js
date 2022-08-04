import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, images, SIZES } from "../../constants";
import { t } from "../../hooks/UseI18n";
import { SimpleLineIcons } from "@expo/vector-icons";

const SelectedConatctItem = ({ item, onIconPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          item?.image
            ? {
                uri: item?.image,
              }
            : images.userPlaceholder
        }
        style={styles.profileImage}
      />

      <View style={{ marginRight: 10 }}>
        <Text style={styles.name}>
          {item?.username ? item?.username : t("selectFriend")}
        </Text>
        <Text style={styles.number}>{item?.name}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: 40,
        }}
        onPress={onIconPress}
      >
        <SimpleLineIcons name="arrow-down" size={20} color="#525298" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectedConatctItem;

const styles = StyleSheet.create({
  container: {
    //  marginTop:58,
    backgroundColor: "rgba(8, 160, 247, 0.06)",
    width: 315,
    height: 80,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: SIZES.padding,
  },
  name: {
    ...FONTS.h4,
    fontSize: 13,
    color: COLORS.black,
    letterSpacing: 0.3,
  },
  number: {
    ...FONTS.body5,
    color: COLORS.black,
    opacity: 0.5,
    letterSpacing: 0.3,
  },
});
