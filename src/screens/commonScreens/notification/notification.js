import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "@constants";
import { Header, NotificationItem } from "@components";
import LottieView from "lottie-react-native";

const Notification = ({ navigation }) => {
  const [notifictionsList, setNotifictionsList] = useState();

  useEffect(() => {
    var currentDate = new Date();

    //getting today notification with filter and with today date
    const todayNotification = dummyData.notification.filter(
      (x) => x.date == currentDate.toLocaleDateString()
    );
    //getting older notification with filter and if date id differnet than currentdate

    const olderNotification = dummyData.notification.filter(
      (x) => x.date != currentDate.toLocaleDateString()
    );

    const data = [
      {
        title: todayNotification.length != 0 ? "today" : "", //checking if todaynotification have element else retrun title ""
        data: todayNotification,
      },
      {
        title: olderNotification.length != 0 ? "older" : "", //checking if oldernotification have element else retrun title ""
        data: olderNotification,
      },
    ];
    //setting section list data with today notification and older
    setNotifictionsList(
      data.filter((x) => x.title != "") //filtering data base if title has value or is "" for not  add empty element in notificationlist
    );
  }, []);

  //render
  function renderHeader() {
    return (
      <Header
        title={t("notification")}
        rightIcon={notifictionsList?.length != 0 ? icons.seen : null}
        rightIconStyle={{
          width: 24,
          height: 24,
        }}
        leftIcon={icons.left_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }

  function renderLottie() {
    return (
      <LottieView
        source={require("@assets/images/no-notificaition")}
        autoPlay
        loop={false}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* section list for notification list */}
      <SectionList
        sections={notifictionsList}
        style={{ ...SIZES.marginHorizontal }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return (
            <View style={{ marginTop: 16 }}>
              <NotificationItem item={item} />
            </View>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.timeText}>{t(title)}</Text>
        )}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Text
                style={{
                  marginTop: 40,
                  ...FONTS.h2,
                  fontSize: 15,
                  color: COLORS.blue,
                }}
              >
                {t("noNotification")}
              </Text>
              {renderLottie()}
              {console.log(notifictionsList)}
              <Text
                style={{
                  ...FONTS.body5,
                  fontSize: 12,
                  color: COLORS.blue,
                }}
              >
                {t("noNotificationText")}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  timeText: {
    ...FONTS.h5,
    color: COLORS.lightGray3,
    fontSize: 15,
    marginTop: 24,
  },
});
