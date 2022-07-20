import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, icons, images, SIZES } from "../../constants";
import { Button } from "@components";
import { t } from "../../hooks/UseI18n";

const ContactItem = ({
  item,
  onPress,
  isSelected,
  onAddPress,
  showAddButton = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        borderColor: isSelected ? COLORS.gray : COLORS.white,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item?.profileURL ? item?.profileURL : images.boy}
          style={styles.profileImage}
        />

        <View style={{ marginLeft: 15 }}>
          <Text numberOfLines={1} style={styles.name}>
            {item.username}
          </Text>
          <Text style={styles.number}>
            {item?.firstName} {item?.lastName}
          </Text>
        </View>
      </View>
      {showAddButton && (
        <View>
          <Button
            label={"ADD"}
            onPress={() => {
              onAddPress(item?.uid);
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: SIZES.padding,
  },
  name: {
    ...FONTS.h5,
    fontSize: 13,
    color: COLORS.darkBlue3,
    letterSpacing: 0.3,
    width: 200,
  },
  number: {
    ...FONTS.body5,
    color: COLORS.lightGray3,
    letterSpacing: 0.3,
  },
});
