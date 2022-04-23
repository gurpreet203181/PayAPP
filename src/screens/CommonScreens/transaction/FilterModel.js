import React, { useMemo, useState } from "react";
import { t } from "../../../hooks/UseI18n";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants";
import { Button, CustomMultiSlider } from "../../../components";
import Modal from "react-native-modal";

const FilterModel = ({ isVisible, onClosePress, filters }) => {
  const [multiSliderValue, setMultiSliderValue] = useState("");
  const [date, setDate] = useState("NOV 18");

  // const multiSliderValuesChange = values => setMultiSliderValue(values);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const updateArrayFilter = useMemo(() => {
    setAppliedFilters([multiSliderValue, date]);
  }, [multiSliderValue]);
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onModalWillShow={() => setMultiSliderValue([0, 500])} //set default value when model open
        onBackButtonPress={onClosePress} //onClosepress function to close model by changes isvisible value
        onBackdropPress={onClosePress}
        useNativeDriver={true}
        propagateSwipe
        style={styles.view}
      >
        <View
          style={{
            height: 500,
            backgroundColor: COLORS.white,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}
        >
          <View style={{ ...SIZES.marginHorizontal, marginTop: 20 }}>
            <Text style={{ ...FONTS.h4, fontSize: 14 }}>{t("Filter")}</Text>
          </View>

          <ScrollView
            style={{ ...SIZES.marginHorizontal, marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
              <Text style={{ ...FONTS.h4, fontSize: 14 }}>Price Range</Text>

              {/* Custom multi slider which use @ptomasroos/react-native-multi-slider library with custom desgin  */}
              <CustomMultiSlider
                min={0}
                max={1000}
                defaultValue={[0, 500]}
                onValuesChange={setMultiSliderValue}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.text}>{multiSliderValue[0]} </Text>
                <Text style={styles.text}>{multiSliderValue[1]}</Text>
              </View>

              {/* Button to apply filters 
                           onPress get useCallBack function and pass appliedFilters array filter trasaction list later */}
              <Button
                label={t("apply")}
                onPress={() => {
                  filters(appliedFilters);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModel;

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
