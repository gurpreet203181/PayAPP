import React from "react";
import { t } from "../../hooks/UseI18n";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import TransactionItem from "../../components/molecules/TransactionItem";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { FONTS } from "../../constants";

const List = (props) => {
  const navigation = useNavigation();

  /*const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <TransactionItem item={item}  
      onPress={()=> navigation.navigate('TransactionDetail', { item })}/>;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <TransactionItem item={item}  
      onPress={()=> navigation.navigate('TransactionDetail', { item })}/>;
    }
    // filter of the description
    if (item.item.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <TransactionItem item={item}  
      onPress={()=> navigation.navigate('TransactionDetail', { item })}/>;
    }

  };*/
  function renderLottie() {
    return (
      <LottieView
        source={require("../../assets/images/61372-404-error-not-found.json")}
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
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked?.(false);
        }}
      >
        {props.data?.length != 0 ? (
          <FlatList
            data={props?.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionItem
                item={item}
                onPress={() =>
                  navigation.navigate("TransactionDetail", { item })
                }
              />
            )}
          />
        ) : (
          //not found view with lottie animation and text
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    height: "85%",
    width: "100%",
    paddingBottom: 55,
  },
});
