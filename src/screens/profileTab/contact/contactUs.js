import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Image, Text } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Header, FormInput, Button } from "@components";

const ContactUs = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  //render
  function renderHeader() {
    return (
      <Header
        title={t("contactsUs")}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          ...SIZES.marginHorizontal,
          marginTop: 58,
        }}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <Text style={{ ...FONTS.h4, color: COLORS.lightGray3 }}>
            {t("contactUsText")}
          </Text>
        </View>

        <FormInput
          value={name}
          placeholder={t("username")}
          inputStyle={{ color: COLORS.darkBlue3 }}
          containStyle={{
            marginTop: SIZES.radius,
          }}
          onChange={(value) => {
            setName(value);
          }}
          //errorMsg={usernameError}
          prependComponenet={
            <Image
              source={icons.user}
              style={{ width: 27, height: 27, tintColor: COLORS.black2 }}
            />
          }
        />
        <FormInput
          value={email}
          placeholder={t("email")}
          keyboradType="email-address"
          autoCompleteType="email"
          inputStyle={{ color: COLORS.darkBlue3 }}
          onChange={(value) => {
            //  utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          //errorMsg={emailError}
          prependComponenet={
            <Image
              source={icons.email}
              style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
            />
          }
        />
        <Text
          style={{
            marginTop: 60,
            color: COLORS.lightGray3,
            ...FONTS.body5,
            alignSelf: "flex-end",
          }}
        >
          {t("maxWords")}
        </Text>
        <FormInput
          value={message}
          placeholder={t("Message")}
          keyboradType="default"
          multiline={true}
          numberOfLines={8}
          maxLength={250}
          inputStyle={{ height: 200, color: COLORS.darkBlue3 }}
          containerStyle={{ borderWidth: 1, padding: 10 }}
          textContainerStyle={{ borderBottomWidth: 0 }}
          onChange={(value) => {
            setMessage(value);
          }}
          //errorMsg={emailError}
          prependComponenet={
            <Image
              source={icons.message}
              style={{ width: 20, height: 20, tintColor: COLORS.black2 }}
            />
          }
        />
        <Button
          label={t("sendMessage")}
          labelStyle={{ ...FONTS.h3, fontSize: 16, color: COLORS.white }}
          containerStyle={{
            height: 56,
            width: 327,
            borderRadius: 16,
            backgroundColor: COLORS.darkBlue3,
            justifyContent: "center",
            alginItem: "center",
            marginTop: 60,
          }}
        />
      </View>
    </View>
  );
};

export default ContactUs;
