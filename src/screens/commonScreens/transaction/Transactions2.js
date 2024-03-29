import React, { useState, useEffect, useCallback, useMemo } from "react";
import { t } from "../../../hooks/UseI18n";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { COLORS, icons, dummyData, SIZES } from "../../../constants";
import { Header, Section, SearchBar, List } from "../../../components";
import FilterModel from "./FilterModel";
import { Entypo } from "@expo/vector-icons";
import { get_Wallet_Transactions } from "src/api/rapyd/WalletTransactionObject";
import { useSelector } from "react-redux";
const Transactions2 = ({ route, navigation }) => {
  const item = route?.params?.item;
  const { user } = useSelector((state) => state.userInfo);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, Setdata] = useState();
  const [filterData, setfilterData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState();
  const [pageNumber, setPageNumber] = useState(2);
  const [stopOnEndReached, setStopOnEndReached] = useState(false);
  //getData from dummydata only once

  useEffect(() => {
    const getData = async () => {
      //Filter
      if (item === "all") {
        //if user want to view all trasactions
        get_Wallet_Transactions(user?.ewalletId, 1, 8).then((data) => {
          Setdata(data);
        });
      } else if (item) {
        // if user want to view specific card's transactions
        Setdata(dummyData.Transaction.filter((x) => x.card == item.id));
      }
    };
    getData();
  }, []);

  //code will run every time searchphrase is changed and fliter data base on search
  const filterList = useMemo(() => {
    if (!filtersApplied) {
      // if search is different then blank
      if (searchPhrase.trim() == "") {
        setfilterData(data);
      }

      if (searchPhrase.trim() != "") {
        setfilterData(
          data.filter((x) =>
            x.type.startsWith(
              searchPhrase.toUpperCase().trim().replace(/\s/g, "")
            )
          )
        );
      }
    }
  }, [data, searchPhrase, filtersApplied]);

  //callback to get data of applied filter by user and filter list
  const filters = useCallback((appliedFilters) => {
    setFiltersApplied(appliedFilters);
    setModalVisible(false);
    //setting filter data with filter applied
    //using appliedFilters instead of filtersApplied where apllied filters is store
    //becasue rect don't guarantee state is not update immediately
    setfilterData((curent) => [
      ...curent.filter(
        (x) =>
          x.amount >= appliedFilters[0][0] && x.amount <= appliedFilters[0][1]
      ),
    ]);
  }, []);

  //Model show and close function
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //function to clear applied filters and set list to searchphrase or to all
  const removeFilter = () => {
    setFiltersApplied();
  };
  //loading new data after end of flatlist
  const onEndReached = () => {
    const page = pageNumber;
    if (stopOnEndReached) {
      return;
    }
    get_Wallet_Transactions(user?.ewalletId, page, 8).then((response) => {
      if (response == "no_data") {
        setStopOnEndReached(true);
        return;
      }
      Setdata((current) => [...current.concat(response)]);
      setPageNumber(page + 1);
    });
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
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Header */}
      {renderHeader()}
      {/* SearchBar 
              on input change setSearchPhrase get search value 
              which trigger useEfect to filter data and set filterData which passed to transaction list  */}
      <View style={styles.SearchBarContainer}>
        {filtersApplied && searchPhrase.trim() == "" ? (
          <View />
        ) : (
          <SearchBar
            searchPhrase={searchPhrase}
            onChangeText={setSearchPhrase}
            onCrossPress={removeFilter}
            clicked={clicked}
            setClicked={setClicked}
          />
        )}
        {!filtersApplied ? (
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10,
            }}
            onPress={toggleModal}
          >
            <Image source={icons.filter} style={{ width: 24, height: 25 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={removeFilter}
          >
            <View
              style={{
                position: "absolute",
                top: 4,
                right: -10,
                zIndex: 1,
                backgroundColor: COLORS.white,
              }}
            >
              <Entypo name="circle-with-cross" size={18} color="red" />
            </View>
            <Image source={icons.filter} style={{ width: 24, height: 25 }} />
          </TouchableOpacity>
        )}
      </View>
      {/* Model for applying filters  */}
      {/* onClosePress a function passed which close model   */}
      {/* filters get a useCallback whick  trigger on  apply filter button press and get applied Filters data in callback 
               which is set on filter useState to filter list  */}
      <FilterModel
        isVisible={isModalVisible}
        onClosePress={toggleModal}
        filters={filters}
      />

      {!filterData ? (
        <View style={{ marginTop: 40 }}>
          <ActivityIndicator color={COLORS.black} size="large" />
        </View>
      ) : (
        <View>
          {/* Transaction */}
          <Section
            label={t("transactions")}
            containerStyle={{ marginTop: 60 }}
          />

          {/* //Transaction list */}
          <List
            searchPhrase={searchPhrase}
            data={filterData}
            setClicked={setClicked}
            endReached={onEndReached}
          />
        </View>
      )}
    </View>
  );
};

export default Transactions2;

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
