import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { COLORS, icons, FONTS, SIZES, dummyData } from "@constants";
import { Header, Section } from "@components";

const AccountInfo = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(dummyData.myProfile);
  }, []);
  //render
  function renderHeader() {
    return (
      <Header
        title={t("accountInfo")}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderProfileImage() {
    return (
      <View
        style={{
          ...SIZES.marginHorizontal,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 58,
          borderWidth: 10,
          width: 100,
          height: 100,
          borderRadius: 50,
          borderColor: COLORS.white,
          ...styles.shadow,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          style={styles.img}
          source={data?.profileImage ? data.profileImage : icons.user}
        />
        <View style={styles.imgEdit}>
          <Image
            source={icons.pencil}
            style={{ width: 12, height: 12, tintColor: COLORS.white }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Img ,name and gmail */}
      {renderProfileImage()}

      <ScrollView style={{ marginTop: 32, ...SIZES.marginHorizontal }}>
        {/* Personal info */}
        <View>
          <Section
            label={t("personalInfo")}
            labelStyle={{ ...FONTS.h4, fontSize: 16 }}
            containerStyle={{ marginHorizontal: 0 }}
          />
          {/* rows */}
          <View style={styles.infoContainer}>
            {/* name */}
            <View style={{ ...styles.infoRow, marginTop: 8 }}>
              <Text style={styles.infoTitle}>{t("yourName")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.name}
              </Text>
            </View>
            {/* username */}
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>{t("username")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.username}
              </Text>
            </View>
            {/* phone number */}
            <View style={{ ...styles.infoRow, marginTop: 8 }}>
              <Text style={styles.infoTitle}>{t("AccountPhonenumber")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.phoneNumber}
              </Text>
            </View>
            {/* email */}
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>{t("AccountEmail")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {data?.email}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 8,
  },
  img: {
    resizeMode: "contain",
    height: 80,
    width: 80,
    borderRadius: 64,
  },
  imgEdit: {
    position: "absolute",
    bottom: 0,
    right: -5,
    zIndex: 1,
    backgroundColor: COLORS.darkBlue3,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 16,
  },
  infoRow: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    alignItems: "center",
  },
  infoTitle: {
    ...FONTS.body2,
    fontSize: 14,
    color: COLORS.lightGray3,
  },
  infoData: {
    ...FONTS.body2,
    fontSize: 14,
    textAlign: "right",
    color: COLORS.darkBlue3,
    paddingLeft: 10,
  },
});