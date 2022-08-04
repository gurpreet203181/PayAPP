import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { COLORS, icons, FONTS, SIZES, dummyData } from "@constants";
import { Header, Section, FormInput, Button } from "@components";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

//avater
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";

const AccountInfo = ({ navigation }) => {
  const { user } = useSelector((state) => state.userInfo);

  //render
  function renderHeader() {
    return (
      <Header
        title={t("accountInfo")}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.popToTop()}
      />
    );
  }
  function renderProfileImage() {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate("EditProfileImg")}
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
          source={
            user?.profileUrl
              ? {
                  uri: user.profileUrl,
                }
              : icons.user
          }
        />

        <View style={styles.imgEdit}>
          <Image
            source={icons.pencil}
            style={{ width: 12, height: 12, tintColor: COLORS.white }}
          />
        </View>
      </TouchableOpacity>
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
                {user?.firstName} {user?.lastName}
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
                {user?.username}
              </Text>
            </View>
            {/* phone number */}
            <View style={{ ...styles.infoRow, marginTop: 8 }}>
              <Text style={styles.infoTitle}>{t("AccountPhonenumber")}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {user?.phoneNumber !== null ? (
                  <Text
                    style={styles.infoData}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  >
                    {user?.phoneNumber}
                  </Text>
                ) : (
                  <Text>-</Text>
                )}
                {user?.phoneNumberVerified && (
                  <Image
                    source={icons.checked}
                    style={{ width: 15, height: 15, marginLeft: 12 }}
                  />
                )}
              </View>
            </View>
            {/* email */}
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>{t("AccountEmail")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {user?.email}
              </Text>
            </View>

            {/* currency */}

            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>{t("currency")}</Text>
              <Text
                style={styles.infoData}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {user?.currency}
              </Text>
            </View>
          </View>
        </View>

        <Button
          containerStyle={styles.editButton}
          labelStyle={styles.editButtonLabel}
          label={t("edit")}
          onPress={() => navigation.navigate("EditAccount", { user: user })}
        />
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
  editButton: {
    marginTop: 34,
    height: 56,
    width: 327,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
  },
  editButtonLabel: {
    color: COLORS.darkBlue3,
    ...FONTS.h5,
    fontSize: 15,
  },
});
