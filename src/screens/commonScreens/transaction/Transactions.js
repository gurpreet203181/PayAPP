import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import { COLORS, icons, dummyData, SIZES, FONTS } from "@constants";
import { Header, Section, TransactionItem } from "@components";
import { cloudFunction } from "src/config/firebase";

import { useSelector } from "react-redux";
import { utils } from "src/utils";
import LottieView from "lottie-react-native";

const Transactions = ({ route, navigation }) => {
  const item = route?.params?.item;

  const { user } = useSelector((state) => state.userInfo);

  const [data, Setdata] = useState();
  const [page, setPage] = useState(1);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  //getData from dummydata only once

  useEffect(() => {
    const getData = async () => {
      //Filter
      await cloudFunction
        .httpsCallable("walletTransaction-get_Wallet_Transactions")({
          ewalletId: user?.ewalletId,
          page_number: page,
          page_size: 15,
        })
        .then((response) => {
          console.log(response.data);
          response.data != "no_data" ? Setdata(response.data) : Setdata([]);
        });
    };
    getData();
  }, []);

  //loading new data after end of flatlist
  const onEndReached = async () => {
    if (!allDataLoaded) {
      const pageNumber = page + 1;
      //calling api call to get next  trasaction page
      await cloudFunction
        .httpsCallable("walletTransaction-get_Wallet_Transactions")({
          ewalletId: user?.ewalletId,
          page_number: page,
          page_size: 15,
        })
        .then((response) => {
          if (response.data == "no_data") {
            setAllDataLoaded(true);
          }
          setPage(pageNumber);
          Setdata((data) => [...data.concat(response.data)]);
        });
    } else return;
  };

  //render
  function renderHeader() {
    return (
      <Header
        title={t("transactions")}
        leftIcon={icons.close}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }

  function renderLottie() {
    return (
      <LottieView
        source={require("@assets/images/61372-404-error-not-found.json")}
        autoPlay
        loop={true}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
        }}
      />
    );
  }
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Header */}
      {renderHeader()}
      {!data ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator color={COLORS.darkBlue3} size="large" />
        </View>
      ) : (
        <View style={{ flex: 1, marginBottom: 20 }}>
          {/* Transaction */}
          <Section
            label={t("transactions")}
            containerStyle={{ marginTop: 60, marginBottom: 10 }}
          />

          {/* //Transaction list */}
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const cleanItem = utils.cleanItem(item);
              return (
                <TransactionItem
                  item={cleanItem}
                  onPress={() =>
                    navigation.navigate("TransactionDetail", { item })
                  }
                />
              );
            }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 80,
                }}
              >
                {renderLottie()}
                <Text style={{ marginTop: 40, ...FONTS.h2, fontSize: 15 }}>
                  {t("noResult")}
                </Text>
                <Text style={{ ...FONTS.body5, fontSize: 12, opacity: 0.5 }}>
                  {t("noSearchResult")}
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  SearchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 44,
    ...SIZES.marginHorizontal,
  },
});
