import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  COLORS,
  FONTS,
  icons,
  images,
  SIZES,
  dummyData,
} from "../../../constants";
import { Header, Section, InfoItem, ProfileButton } from "../../../components";
import { t } from "../../../hooks/UseI18n";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Dash from "react-native-dash";

const TransactionDetail = ({ route, navigation }) => {
  const item = route.params.item;
  const [showDetail, setShowDetial] = React.useState(false);

  //render
  function renderHeader() {
    return (
      <Header
        title={item.item}
        leftIcon={icons.close}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  function renderAmountDetail() {
    return (
      <View
        style={{
          marginTop: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 50,
            color: "#2C2C63",
            paddingTop: 50,
          }}
        >
          {item.amount}$
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() =>
            showDetail ? setShowDetial(false) : setShowDetial(true)
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                opacity: 0.5,
                ...FONTS.body5,
                fontSize: 13,
                letterSpacing: 0.3,
              }}
            >
              {t("details")}
            </Text>
            <AntDesign
              name="downcircleo"
              style={{ opacity: 0.5, marginLeft: 8 }}
              size={15}
              color="black"
            />
          </View>
        </TouchableOpacity>

        {showDetail && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ alignItems: "flex-start", marginTop: 20 }}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={2}
                style={{
                  width: 250,
                  ...FONTS.body5,
                  fontSize: 13,
                  color: COLORS.black,
                  opacity: 0.5,
                }}
              >
                {t("itemDetail", {
                  item: item.item,
                  date: item.date,
                  card: item.card,
                })}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 36,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Dash
                  style={{ width: 120, height: 1 }}
                  dashGap={7}
                  dashLength={6}
                  dashColor={"#D5D5E4"}
                />

                <ProfileButton
                  icon={dummyData.myProfile.profileImage}
                  containerStyle={{
                    backgroundColor: COLORS.primary,
                    marginHorizontal: 20,
                    width: 40,
                    height: 40,
                  }}
                />

                <Dash
                  style={{ width: 120, height: 1 }}
                  dashGap={7}
                  dashLength={6}
                  dashColor={"#D5D5E4"}
                />
              </View>

              <Text
                style={{
                  marginTop: 13,
                  ...FONTS.h4,
                  fontSize: 18,
                  letterSpacing: 0.3,
                }}
              >
                {item.name}{" "}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  opacity: 0.5,
                  ...FONTS.body5,
                  fontSize: 15,
                  marginTop: 10,
                }}
              >
                Via stardone 96
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderCardInfo() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...SIZES.marginHorizontal, marginTop: 8 }}>
          <InfoItem
            label={"Name"}
            value={"Gurpreet singh"}
            icon={<FontAwesome name="user" size={16} color="white" />}
          />

          <InfoItem
            label={"Customer ID"}
            value={"0098 7485 1298"}
            icon={<FontAwesome name="user" size={16} color="white" />}
          />

          <InfoItem
            label={"Customer ID"}
            value={"September 2020"}
            icon={<FontAwesome name="user" size={16} color="white" />}
          />
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Amount and detail */}
      {renderAmountDetail()}

      {/* Account Info */}
      <Section
        label={t("accountInfo")}
        labelStyle={{ ...FONTS.h3, opacity: 10, marginTop: 20 }}
        containerStyle={{ marginTop: 33 }}
      />
      {renderCardInfo()}
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
