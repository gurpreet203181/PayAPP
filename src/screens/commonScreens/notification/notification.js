import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "@constants";
import { Header, NotificationItem } from "@components";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Notification = ({ navigation }) => {
  const [notifictionsList, setNotifictionsList] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      var notifications = await AsyncStorage.getItem("@notifications");
      notifications = JSON.parse(notifications);
      setNotifictionsList(notifications.reverse());
    };
    getdata();
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
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      {/* Header */}
      {renderHeader()}

      {notifictionsList > 0 && (
        <FlatList
          data={notifictionsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => {
            return (
              <View style={{ marginTop: 16 }}>
                <NotificationItem item={item} />
              </View>
            );
          }}
        />
      )}
      {notifictionsList.length == 0 && (
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
      )}
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
