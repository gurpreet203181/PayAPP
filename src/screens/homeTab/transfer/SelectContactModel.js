import React, { useState, useEffect, useMemo } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { COLORS, icons, SIZES, dummyData } from "@constants";
import { Header, SearchBar, Section, ContactItem, List } from "@components";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "@redux/reducers/contactSlice";

const SelectContactModel = ({ isVisible, closeModel }) => {
  const dispatch = useDispatch(); //redux dispatch to set selectedcontact

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [allContacts, setAllContacts] = useState();
  const [recentContacts, setRecentContacts] = useState();
  const [filterContacts, setFilterContacts] = useState();

  //  const [selectedContact, setselectedContact] = useState();

  //getData from dummydata only once
  useEffect(() => {
    const getData = async () => {
      setAllContacts(dummyData.contacts);
      setRecentContacts(dummyData.RecentContact);
    };
    getData();
  }, []);

  //code will run every time searchphrase is changed and fliter data base on search
  const filterContact = useMemo(() => {
    // if search is different then blank
    if (searchPhrase.trim() == "") {
      setFilterContacts();
    }

    if (searchPhrase.trim() != "") {
      setFilterContacts(
        allContacts.filter((x) =>
          x.name
            .toUpperCase()
            .startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
        )
      );
    }
  }, [searchPhrase]);

  //render
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
          searchPhrase={searchPhrase}
          onChangeText={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
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
              renderItem={({ item }) => (
                <View key={item.key}>
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
          </View>
        ) : (
          //No contact view
          <View>
            <Text>Add Contact</Text>
          </View>
        )}
      </View>
    );
  }
  function renderFilterList() {
    return (
      <View style={styles.listsContainer}>
        <FlatList
          data={filterContacts}
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
        {filterContacts.length == 0 && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Not Found</Text>
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
            {/* if user searced then filterContacts get list with filtered list so render 
                     list with filterList else render all contacts and recent contacts section */}
            {!filterContacts ? renderContacts() : renderFilterList()}
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
