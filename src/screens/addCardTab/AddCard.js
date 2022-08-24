import React, { useState } from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { Header } from "../../components";
import { firestoreDb, cloudFunction } from "@config/firebase";
import { useSelector } from "react-redux";
const AddCard = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.userInfo);

  const addCard = async () => {
    let customerId = user?.customerId !== "" ? user?.customerId : "";
    //checking if user have customer id
    if (customerId == "") {
      await cloudFunction
        .httpsCallable("customerObject-create_Customer")({
          user: user,
        })
        .then((response) => {
          console.log(response);
          if (response.data?.status?.status == "SUCCESS") {
            customerId = response.data?.data?.id;
          }
          /*  firestoreDb
            .collection("users")
            .doc(user?.uid)
            .update({
              customerId: customerId,
            })
            .catch((e) => {
              console.log("add friend:" + e);
            });*/
        });
    }

    await cloudFunction
      .httpsCallable("paymentObject-addPaymentMethod")({
        user: user,
        customerId: customerId,
      })
      .then((response) => {
        if (response.data.status?.status == "SUCCESS") {
          const url = response.data.data?.redirect_url;
          navigation.navigate("UrlWebview", { redirect_url: url });
          //Linking.openURL(redirect_url);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //render
  function renderHeader() {
    return (
      <Header
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
        title={t("addPayment")}
      />
    );
  }

  function renderAddCard() {
    return (
      <View style={{ ...SIZES.marginHorizontal, alignItems: "center" }}>
        <TouchableOpacity style={styles.addCard} onPress={addCard}>
          <Image source={icons.plus} style={styles.plusImg} />
          <Text style={styles.addCardText}>{t("addCard")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}
      {renderAddCard()}

      {/* AddCard model  */}
      {/* <View>
        <AddCardModel isVisible={isModalVisible} onClosePress={toggleModal} />
      </View> */}
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  addCard: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "rgba(18, 18, 29, 0.05);",
    height: 200,
    width: 315,
    borderRadius: 16,
    borderColor: COLORS.darkGray2,
  },
  plusImg: {
    height: 20,
    width: 20,
    tintColor: COLORS.black,
  },
  addCardText: {
    marginTop: 8,
    ...FONTS.h4,
  },
});
