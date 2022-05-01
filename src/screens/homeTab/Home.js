import React from "react";
import { t } from "@hooks/UseI18n";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { COLORS, FONTS, icons, SIZES, dummyData } from "../../constants";
import { ProfileButton, Section, TransactionItem } from "../../components";
import { CardsCarousel } from "../../stores";

const Home = ({ navigation }) => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ...SIZES.marginHorizontal,
          marginTop: 13,
        }}
      >
        {/* Hello & name */}
        <View>
          <Text style={styles.welcomeText}>{t("welcome")}</Text>
          {/* Name */}
          <Text style={styles.nameText}>{dummyData.myProfile.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notification")}
          style={styles.notificationContainer}
        >
          {/* dot */}
          <View style={styles.notificationDot} />
          <Image
            source={icons.bell}
            style={{ width: 24, height: 24, tintColor: "#1D2734" }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCards() {
    return (
      <View>
        <View style={{ justifyContent: "center" }}>
          <Section
            label={t("cards")}
            icon={null}
            containerStyle={{ marginTop: 16 }}
          />

          <CardsCarousel
            data={dummyData.Cards}
            containerStyle={{
              height: 200,
            }}
            cardContainerStyle={{}}
            cardStyle={{
              width: 340,
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  }

  function renderTransactions() {
    return (
      <FlatList
        data={dummyData.Transaction}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        style={{ marginBottom: 22 }}
        renderItem={({ item, index }) => (
          <View
            style={[
              index === dummyData.Transaction.length - 1
                ? { marginBottom: 50 }
                : null,
            ]}
          >
            <TransactionItem
              item={item}
              onPress={() => navigation.navigate("TransactionDetail", { item })}
            />
          </View>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* header */}
      {renderHeader()}

      {/* Cards View */}

      {renderCards()}

      {/* Transactions */}
      <Section
        label={t("transactions")}
        icon={icons.right_arrow}
        iconstyle={{ width: 15, height: 15, tintColor: "#273240" }}
        containerStyle={{ marginTop: 75 }}
        onIconPress={() => navigation.navigate("Transactions", { item: "all" })}
      />
      {renderTransactions()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  notificationContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    backgroundColor: "#1D3A70",
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 13,
    right: 13,
  },
  welcomeText: {
    ...FONTS.body2,
    color: COLORS.lightGray3,
    fontSize: 12,
  },
  nameText: {
    ...FONTS.h5,
    fontSize: 20,
    color: COLORS.darkBlue3,
    marginTop: 4,
  },
});
