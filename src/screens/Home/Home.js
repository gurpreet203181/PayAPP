import React from "react";
import { t } from "../../hooks/UseI18n";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import {
  COLORS,
  FONTS,
  icons,
  images,
  SIZES,
  dummyData,
} from "../../constants";
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
        }}
      >
        {/* Heloo && name */}
        <View style={{ marginTop: SIZES.padding }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: COLORS.black3, ...FONTS.h2 }}>
              {t("hello")}
            </Text>
            <Image
              source={icons.star}
              style={{ height: 24, width: 24, marginLeft: 5 }}
            />
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ ...FONTS.body3, fontSize: 14 }}
          >
            {dummyData.myProfile.name}
          </Text>
        </View>
        {/* Profile */}
        <ProfileButton
          icon={dummyData.myProfile.profile_image}
          containerStyle={{
            backgroundColor: COLORS.primary,
            width: 27,
            height: 27,
          }}
          iconStyle={{ with: 19, height: 20 }}
        />
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
});
