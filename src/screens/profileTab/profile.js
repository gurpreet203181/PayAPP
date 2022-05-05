import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { COLORS, icons, SIZES, dummyData, FONTS } from "@constants";
import { Header, MoreItem, LineDivider } from "@components";
import LogoutModal from "./logout/logoutModal";
import { Modal } from "react-native-web";
const Profile = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setData(dummyData.myProfile);
  }, []);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("profile")}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}
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
          source={data?.profileImage ? data.profileImage : icons.user}
        />
        <Text style={styles.nameText}>{data?.name}</Text>
        <Text style={styles.gmailText}>gurpreet@gmail.com</Text>
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
          icon={icons.users}
          title={t("contactList")}
          iconStyle={{ tintColor: "#1DAB87" }}
          onPress={() => navigation.navigate("ContactsList")}
        />
        <MoreItem
          icon={icons.option}
          title={t("language")}
          iconStyle={{ tintColor: "#7B61FF" }}
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
          icon={icons.option}
          title={t("generalSetting")}
          iconStyle={{ tintColor: "#5FA8EE" }}
          onPress={() => navigation.navigate("Transfer")}
        />
        <MoreItem
          icon={icons.option}
          title={t("changePassword")}
          iconStyle={{ tintColor: "#FFB9AA" }}
          onPress={() => navigation.navigate("Transfer")}
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
