import React from "react";
import { t } from "@hooks/UseI18n";
import { View, StyleSheet, Text, Image } from "react-native";
import { COLORS, SIZES, icons, FONTS } from "@constants";
import Modal from "react-native-modal";
import { Button } from "@components";
import { auth } from "@config/firebase";
import { setUserInfo } from "@redux/reducers/userInfoSlice";
import { useDispatch } from "react-redux";
const LogoutModal = ({ isVisible, onClosePress, onLogoutPress }) => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await auth.signOut();

      // onLogoutPress();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClosePress} //onClosepress function to close model by changes isvisible value
      onBackdropPress={onClosePress}
      useNativeDriver={true}
      propagateSwipe
      style={styles.view}
    >
      <View
        style={{
          height: 250,
          backgroundColor: COLORS.white,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={icons.logout}
          style={{ width: 24, height: 24, tintColor: COLORS.darkBlue3 }}
        />
        <Text
          style={{
            ...FONTS.h4,
            fontSize: 14,
            marginTop: 20,
            color: COLORS.darkBlue3,
          }}
        >
          {t("logoutText")}
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 30,
            paddingHorizontal: 40,
          }}
        >
          <Button
            containerStyle={styles.buttonCancel}
            labelStyle={{ color: COLORS.darkBlue3, ...FONTS.h4, fontSize: 14 }}
            label={t("cancel")}
            onPress={onClosePress}
          />
          <Button
            containerStyle={styles.buttonLogout}
            labelStyle={{ color: COLORS.white, ...FONTS.h4, fontSize: 14 }}
            label={t("yesLogout")}
            onPress={() => {
              handleSignOut();
              dispatch(setUserInfo()); //setting redux state to null
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default LogoutModal;

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  buttonCancel: {
    width: 130,
    height: 40,
    borderColor: COLORS.darkBlue3,
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonLogout: {
    width: 130,
    height: 40,
    backgroundColor: COLORS.darkBlue3,

    borderRadius: 16,
  },
});
