import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, FlatList, Share } from "react-native";
import { COLORS, dummyData, FONTS, icons, SIZES } from "@constants";
import { Header, Section, ContactItem, Button } from "@components";
import * as Contacts from "expo-contacts";
import { ScrollView } from "react-native-virtualized-view";

const ContactsList = ({ navigation }) => {
  const [contactsList, setContactsList] = useState();

  //asking Permissions for device contact and get name, number and image filed from contact
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });
        setContactsList(
          data.filter((x) => x.phoneNumbers?.[0].number.trim().length > 9)
        );
      } else {
        setContactsList();
      }
    })();
  }, []);

  const onShare = async () => {
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
  };

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
          data={dummyData.contacts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <View key={item?.key}>
              <ContactItem
                item={item}
                buttonComponent={
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
                    onPress={onShare}
                  />
                }
                //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
              />
            </View>
          )}
        />
      </View>
    );
  }
  function renderContacts() {
    return (
      <View style={{ marginTop: 34, ...SIZES.marginHorizontal }}>
        <Section
          label={t("allContacts")}
          containerStyle={{ marginHorizontal: 0, paddingBottom: 12 }}
        />

        <FlatList
          data={contactsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <View key={item?.key}>
              <ContactItem
                item={item}
                buttonComponent={
                  <Button
                    label={t("invite")}
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
                    onPress={onShare}
                  />
                }
                //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
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

      <ScrollView>
        {/* user Contacts which are using app already */}
        {renderOnAppContacts()}
        {/* All contacts */}
        {renderContacts()}
      </ScrollView>
    </View>
  );
};

export default ContactsList;
