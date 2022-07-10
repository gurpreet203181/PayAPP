import React, { useEffect } from "react";
import { t } from "@hooks/UseI18n";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { COLORS, FONTS, icons, SIZES, dummyData } from "@constants";
import {
  Section,
  TransactionItem,
  LineDivider,
  HomeCardItem,
} from "@components";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo, setUserBalance } from "src/redux/reducers/userInfoSlice";
import { auth, firestoreDb } from "src/config/firebase";
import { get_Wallet_Balance } from "src/api/rapyd/WalletTransactionObject";
const Home = ({ navigation }) => {
  // const { user } = useAuthentication();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const SLIDER_WIDTH = Dimensions.get("window").width - 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    //getting user data from databse and adding to redux state
    //creating a listener if any somthing change document to get real time update
    const subscriber = firestoreDb
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        dispatch(
          setUserInfo({
            email: data?.email,
            username: data?.username,
            phoneNumber: data?.phoneNumber,
            phoneNumberVerified: data?.phoneNumber ? true : false,
            firstName: data?.firstName,
            lastName: data?.lastName,
            profileUrl: data?.profileURL,
            uid: auth?.currentUser?.uid,
            ewalletId: data?.ewalletId,
          })
        );
        console.log(data?.ewalletId);
        get_Wallet_Balance(data?.ewalletId).then((response) => {
          if (response && response.length > 0) {
            dispatch(setUserBalance(response[0]?.balance));
          } else {
            dispatch(setUserBalance(0));
          }
        });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  //render
  function renderHeader() {
    return (
      <View
        style={{
          ...SIZES.marginHorizontal,
          marginTop: 13,
        }}
      >
        {/* hello ,name and notification icon */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Hello & name */}
          <View>
            <Text style={styles.welcomeText}>{t("welcome")}</Text>
            {/* Name */}
            <Text style={styles.nameText}>{user?.username}</Text>
          </View>

          {/* notification */}
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

        {/* balance  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.welcomeText}>{t("yourBalance")}</Text>
          {/* Name */}
          <Text style={styles.balance}>€ {user.balance} </Text>
        </View>
      </View>
    );
  }
  function renderOptionsAndCard() {
    return (
      <View style={styles.OptionsAndCard}>
        {/* options and cards */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* options */}
          <View style={{ ...styles.options, ...styles.shadow }}>
            {/* transfer */}
            <TouchableOpacity
              style={styles.IconButtonView}
              onPress={() => navigation.navigate("Transfer")}
            >
              <Image source={icons.optionsTransfer} style={styles.optionLogo} />
              <Text style={styles.optionText}>{t("transfer")}</Text>
            </TouchableOpacity>

            {/* Top up */}
            <TouchableOpacity
              style={styles.IconButtonView}
              onPress={() => navigation.navigate("TopUp")}
            >
              <Image source={icons.optionsTopUp} style={styles.optionLogo} />
              <Text style={styles.optionText}>{t("topUp")}</Text>
            </TouchableOpacity>

            {/* Withdraw */}
            <TouchableOpacity
              style={styles.IconButtonView}
              //onPress={() => navigation.navigate("WithDraw")}
            >
              <Image source={icons.optionsBill} style={styles.optionLogo} />
              <Text style={styles.optionText}>{t("bill")}</Text>
            </TouchableOpacity>
            {/* more */}
            <TouchableOpacity
              style={styles.IconButtonView}
              onPress={() => navigation.navigate("more")}
            >
              <Image source={icons.optionsMore} style={styles.optionLogo} />
              <Text style={styles.optionText}>{t("more")}</Text>
            </TouchableOpacity>
          </View>

          {/* <CardsAnimated /> */}
          <View>
            <Carousel
              ref={isCarousel}
              data={dummyData.Cards}
              inactiveSlideOpacity={0.9}
              activeSlideAlignment={"start"}
              contentContainerCustomStyle={{ marginLeft: 30 }}
              //slideStyle={{ marginLeft: 24 }}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("CardDetail", { item: item })
                    }
                  >
                    <View>
                      <HomeCardItem item={item} />
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={190}
              useScrollView={true}
              onSnapToItem={(index) => setIndex(index)}
            />
          </View>
        </View>
        {/* pagination */}
        <Pagination
          dotsLength={dummyData.Cards.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          tappableDots={true}
          dotContainerStyle={{ height: 20, width: 10 }}
          // vertical={true}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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
              containerStyle={{ marginTop: 16 }}
              onPress={() => navigation.navigate("TransactionDetail", { item })}
            />
            <LineDivider
              lineStyle={{
                height: index === dummyData.Transaction.length - 1 ? 0 : 1,
                backgroundColor: "#F3F4F6",
                marginTop: 16,
                ...SIZES.marginHorizontal,
                width: "85%",
              }}
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
      {renderOptionsAndCard()}

      {/* Transactions */}
      <Section
        label={t("transactions")}
        icon={icons.right_arrow}
        iconstyle={{ width: 15, height: 15, tintColor: "#273240" }}
        containerStyle={{ marginTop: 24, marginBottom: 10 }}
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

  shadow: {
    shadowColor: "#D1D5DB",
    shadowOffset: {
      width: 16,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 8,
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
    ...FONTS.h3,
    fontSize: 18,
    color: COLORS.darkBlue3,
  },

  balance: { ...FONTS.h5, fontSize: 20, color: COLORS.darkBlue3, marginTop: 4 },
  OptionsAndCard: {
    marginTop: 8,
    // height: 340,
    backgroundColor: COLORS.white3,
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    height: 292,
    width: 83,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  IconButtonView: {
    width: 70,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLogo: {
    width: 24,
    height: 24,
    //tintColor: COLORS.darkBlue3,
  },
  optionText: {
    marginTop: 8,
    ...FONTS.h4,
    fontSize: 12,
    color: COLORS.darkBlue3,
    letterSpacing: 0.3,
  },
});
