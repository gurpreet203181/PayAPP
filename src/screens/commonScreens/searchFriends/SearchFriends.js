import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { COLORS, SIZES, icons } from "@constants";
import { SearchBar, Header, ContactItem } from "@components";
import { cloudFunction, firestoreDb, firebaseAuth } from "src/config/firebase";
import LottieView from "lottie-react-native";
import firestore from "@react-native-firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedContact } from "@redux/reducers/contactSlice";

const SearchFriends = ({ navigation }) => {
  const currentUser = firebaseAuth.currentUser;
  const { friendList } = useSelector((state) => state.userInfo.user);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [result, setResult] = useState();
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch(); //redux dispatch to set selectedcontact

  //search user by username
  const searchUserName = async () => {
    await cloudFunction
      .httpsCallable("searchFriendByUsername")({
        searchPhrase: searchPhrase.toLowerCase(),
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //add user in friend list
  const addFriend = async (frienduid) => {
    console.log(frienduid);
    await firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .update({
        friendList: firestore.FieldValue.arrayUnion(frienduid),
      })
      .catch((e) => {
        console.log("add friend:" + e);
      });
  };

  const onConatctPress = (item) => {
    dispatch(setSelectedContact(item)); //setting selected item on redux state
    navigation.goBack();
  };
  //render
  function renderHeader() {
    return (
      <Header
        leftIcon={icons.back_arrow}
        onLeftIconPress={() => navigation.goBack()}
      />
    );
  }
  //redner
  function renderLottie() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
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
        <Text>No result</Text>
      </View>
    );
  }
  function renderSearchBar() {
    return (
      <View
        style={{
          ...SIZES.marginHorizontal,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <SearchBar
          onChangeText={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          placeHolder={"Search new friend"}
          onArrowPress={searchUserName}
          autoFocus={true}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* header  */}
      {renderHeader()}

      {renderSearchBar()}

      {/* result item */}

      <FlatList
        data={result}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let showAddButton = !friendList.includes(item.uid);
          return (
            <View
              style={{ ...SIZES.marginHorizontal, marginTop: 10 }}
              key={item.key}
            >
              <ContactItem
                item={item}
                //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
                onPress={() => {
                  !showAddButton ? onConatctPress(item) : null;
                }}
                onAddPress={addFriend} //on parent useCallBack is triggered with selected item as parm
                showAddButton={showAddButton}
              />
            </View>
          );
        }}
        ListEmptyComponent={result ? renderLottie : null}
      />
    </View>
  );
};

export default SearchFriends;

const styles = StyleSheet.create({});
