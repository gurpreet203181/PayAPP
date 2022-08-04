import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, FlatList, Share, ActivityIndicator } from "react-native";
import { COLORS, dummyData, FONTS, icons, SIZES } from "@constants";
import { Header, Section, ContactItem, Button } from "@components";
//import * as Contacts from "expo-contacts";
import { cloudFunction } from "src/config/firebase";
import { useSelector } from "react-redux";
const ContactsList = ({ navigation }) => {
  const [contactsList, setContactsList] = useState();
  const { friendList } = useSelector((state) => state.userInfo.user);
  const [showLoading, setLoading] = useState(true);

  useEffect(() => {
    const getFriendListData = async () => {
      await cloudFunction
        .httpsCallable("getFriendListData")({
          friendList: friendList,
        })
        .then((response) => {
          setContactsList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getFriendListData();
  }, [useSelector((state) => state.userInfo.user)]);
  /*  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };*/

  //render
  function renderHeader() {
    return (
      <Header
        title={t("friends")}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }

  function renderOnAppContacts() {
    return (
      <View style={{ marginTop: 34, ...SIZES.marginHorizontal }}>
        <Section
          label={t("yourContacts")}
          containerStyle={{ marginHorizontal: 0, paddingBottom: 12 }}
        />

        <FlatList
          data={contactsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item?.key}
            >
              <ContactItem
                item={item}

                //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
              />
              <Button
                label={t("poke")}
                labelStyle={{
                  color: COLORS.darkBlue3,
                  ...FONTS.body4,
                  fontSize: 12,
                }}
                containerStyle={{
                  //backgroundColor: COLORS.darkBlue3,
                  borderColor: COLORS.darkBlue3,
                  borderWidth: 1,
                  borderRadius: 16,
                  width: 80,
                  height: 35,
                }}
                //onPress={onShare}
              />
            </View>
          )}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* user Contacts which are using app already */}
      {!showLoading && renderOnAppContacts()}
      {showLoading && (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator color={COLORS.darkBlue3} size="large" />
        </View>
      )}
    </View>
  );
};

export default ContactsList;
