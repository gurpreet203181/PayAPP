import React, { useState, useEffect, useMemo } from "react";
import { t } from "@hooks/UseI18n";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, icons, SIZES, dummyData, FONTS } from "@constants";
import { Header, SearchBar, Section, ContactItem, List } from "@components";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "@redux/reducers/contactSlice";
import LottieView from "lottie-react-native";
import { cloudFunction } from "src/config/firebase";
import { useSelector } from "react-redux";
const SelectContactModel = ({ isVisible, closeModel, navigation }) => {
  const dispatch = useDispatch(); //redux dispatch to set selectedcontact

  const [allContacts, setAllContacts] = useState([]);
  const [recentContacts, setRecentContacts] = useState();
  const [listIndex, setListIndex] = useState(0);
  const { friendList } = useSelector((state) => state.userInfo.user);

  //  const [selectedContact, setselectedContact] = useState();

  const getFriendListData = async () => {
    const list = friendList.slice(listIndex, listIndex + 10);
    if (list.length == 0) return [];
    await cloudFunction
      .httpsCallable("getFriendListData")({
        friendList: list,
      })
      .then((response) => {
        console.log(response);
        setAllContacts((data) => [...data.concat(response.data)]);
        const index = listIndex;
        setListIndex(listIndex + 10);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //getData from dummydata only once
  useEffect(() => {
    getFriendListData();
  }, []);

  const loadOtherFriend = () => {
    getFriendListData();
  };

  //redner
  function renderLottie() {
    return (
      <LottieView
        source={require("../../../assets/images/61372-404-error-not-found.json")}
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
  function renderHeader() {
    return (
      <Header
        title={t("contacts")}
        leftIcon={icons.back_arrow}
        onLeftIconPress={closeModel}
      />
    );
  }

  function renderSearchBar() {
    return (
      <View
        style={{
          ...SIZES.marginHorizontal,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 44,
        }}
      >
        <SearchBar
          onFocus={() => navigation.navigate("SearchFriends")}
          placeHolder={"Search new friend"}
        />
      </View>
    );
  }

  function renderContacts() {
    return (
      <View style={styles.listsContainer}>
        {/* recent Contacts 
                render recent section when there is recent present */}

        {recentContacts && (
          <View>
            <Section
              label={t("recentsContacts")}
              containerStyle={{ marginHorizontal: 0 }}
            />
            {recentContacts?.map((item) => {
              return (
                <ContactItem
                  item={item}
                  //isSelected={(selectedContact?.key == 'recent' && selectedContact?.id== item.id)}
                  onPress={() => {
                    dispatch(setSelectedContact(item)); //setting selected item on redux state
                    closeModel();
                  }}
                />
              );
            })}
          </View>
        )}

        {/* all contacts 
                check of there is any contact if not show button add contact*/}
        {allContacts ? (
          <View style={{ flex: 1, marginTop: 34 }}>
            <Section
              label={t("allContacts")}
              containerStyle={{ marginHorizontal: 0, paddingBottom: 12 }}
            />

            <FlatList
              data={allContacts}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.8}
              onEndReached={loadOtherFriend}
              renderItem={({ item }) => (
                <View key={item.key}>
                  <ContactItem
                    item={item}
                    //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
                    onPress={() => {
                      dispatch(setSelectedContact(item)); //setting selected item on redux state
                      closeModel();
                    }}
                    onAddPress={addFriend} //on parent useCallBack is triggered with selected item as parm
                  />
                </View>
              )}
            />
          </View>
        ) : (
          //No contact view
          <View>
            <Text>Add Friends</Text>
          </View>
        )}
      </View>
    );
  }
  function renderFilterList() {
    return (
      <View style={styles.listsContainer}>
        <FlatList
          data={allContacts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <ContactItem
                item={item}
                //isSelected={(selectedContact?.key == 'allContacts' && selectedContact?.id== item.id)}
                onPress={() => {
                  dispatch(setSelectedContact(item)); //setting selected item on redux state
                  closeModel();
                }} //on parent useCallBack is triggered with selected item as parm
              />
            </View>
          )}
        />

        {/* render not found view in case not found contact on search */}
        {allContacts.length == 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 80,
            }}
          >
            {renderLottie()}
            <Text style={{ marginTop: 40, ...FONTS.h2, fontSize: 15 }}>
              {t("noContacts")}
            </Text>
          </View>
        )}
      </View>
    );
  }
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={closeModel} //onClosepress function to close model by changes isvisible value
        onBackdropPress={closeModel}
        useNativeDriver={true}
        propagateSwipe
        style={styles.view}
      >
        <View style={styles.container}>
          {/* render header */}
          {renderHeader()}

          {/* render searchBar  */}
          {renderSearchBar()}

          <ScrollView>
            {/* render Contacts */}
            {/* if user searced then allContacts get list with filtered list so render 
                     list with filterList else render all contacts and recent contacts section */}
            {!allContacts ? renderContacts() : renderFilterList()}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
export default SelectContactModel;

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  listsContainer: {
    marginTop: 36,
    flex: 1,
    ...SIZES.marginHorizontal,
  },
});
