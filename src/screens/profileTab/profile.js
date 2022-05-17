import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { COLORS, icons, SIZES, dummyData, FONTS } from "@constants";
import { Header, MoreItem, LineDivider } from "@components";
import LogoutModal from "./logout/logoutModal";
import { useSelector } from "react-redux";
const Profile = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.userInfo);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(user);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Img ,name and gmail */}
      <View
        style={{
          ...SIZES.marginHorizontal,
          justifyContent: "center",
          marginTop: 34,
          alignItems: "center",
        }}
      >
        <Image
          style={styles.img}
          source={
            user?.profileUrl
              ? {
                  uri: user.profileUrl,
                }
              : icons.user
          }
        />
        <Text style={styles.nameText}>{user?.username}</Text>
        <Text style={styles.gmailText}>{user?.email}</Text>
      </View>

      {/* Options */}
      <ScrollView
        style={{ marginTop: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Referral Code */}

        <MoreItem
          icon={icons.user}
          title={t("accountInfo")}
          iconStyle={{ tintColor: "#203C71", width: 24, height: 24 }}
          onPress={() => navigation.navigate("AccountInfo")}
        />
        <MoreItem
          icon={icons.activity}
          title={t("activity")}
          iconStyle={{ tintColor: "#7B61FF" }}
          onPress={() => navigation.navigate("Activity")}
        />
        <MoreItem
          icon={icons.users}
          title={t("contactList")}
          iconStyle={{ tintColor: "#1DAB87" }}
          onPress={() => navigation.navigate("ContactsList")}
        />

        <LineDivider
          lineStyle={{
            height: 1,
            backgroundColor: "#F3F4F6",
            margin: 24,
            ...SIZES.marginHorizontal,
            width: "85%",
          }}
        />
        <MoreItem
          icon={icons.option}
          title={t("generalSetting")}
          iconStyle={{ tintColor: "#5FA8EE" }}
          onPress={() => navigation.navigate("Transfer")}
        />
        <MoreItem
          icon={icons.option}
          title={t("changePassword")}
          iconStyle={{ tintColor: "#FFB9AA" }}
          onPress={() =>
            navigation.navigate("ForgotPassword", {
              email: user?.email,
            })
          }
        />
        <MoreItem
          icon={icons.option}
          title={t("changePin")}
          iconStyle={{ tintColor: "#AB92F0" }}
          onPress={() => navigation.navigate("Transfer")}
        />
        <LineDivider
          lineStyle={{
            height: 1,
            backgroundColor: "#F3F4F6",
            margin: 24,
            ...SIZES.marginHorizontal,
            width: "85%",
          }}
        />
        <MoreItem
          icon={icons.email}
          title={t("contactsUs")}
          iconStyle={{ tintColor: "#55BBC5" }}
          onPress={() => navigation.navigate("ContactUs")}
        />
        <MoreItem
          icon={icons.option}
          title={t("rateUs")}
          iconStyle={{ tintColor: "#FACC15" }}
          containerStyle={{ marginBottom: 40 }}
          onPress={() => navigation.navigate("Transfer")}
        />
        <MoreItem
          icon={icons.logout}
          title={t("logout")}
          iconStyle={{ tintColor: "#5FA8EE" }}
          hideLeftIcon={true}
          containerStyle={{ marginBottom: 90 }}
          onPress={toggleModal}
        />
      </ScrollView>

      <LogoutModal
        isVisible={isModalVisible}
        onClosePress={toggleModal}
        onLogoutPress={() => {
          toggleModal();
          navigation.navigate("Welcome");
        }}
      />
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  img: {
    resizeMode: "contain",
    height: 80,
    width: 80,
    borderRadius: 64,
  },
  nameText: {
    ...FONTS.h5,
    fontSize: 18,
    color: COLORS.darkBlue3,
    marginTop: 26,
  },
  gmailText: {
    ...FONTS.body3,
    color: COLORS.lightGray3,
    fontSize: 12,
    marginTop: 8,
  },
});
