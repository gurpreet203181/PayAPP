import React, { useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Button, SelectedBankItem } from "@components";
import Modal from "react-native-modal";
import { setWithdrawBankId } from "@redux/reducers/withdrawSlice";
import { useDispatch } from "react-redux";

const SelectBankModal = ({ isVisible, closeModel }) => {
  const dispatch = useDispatch();
  const [selectedBank, setSelctedBank] = useState();
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModel} //onClosepress function to close model by changes isvisible value
      onBackdropPress={closeModel}
      useNativeDriver={true}
      propagateSwipe
      style={styles.view}
    >
      <View
        style={{
          flex: 0.7,
          backgroundColor: COLORS.white,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          alignItems: "center",
        }}
      >
        <View style={{ ...SIZES.marginHorizontal, marginTop: 50 }}>
          <Text style={{ ...FONTS.h5, fontSize: 20 }}>{t("selectBank")}</Text>
        </View>
        {/* bank */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* On click bank is selected 
          selectedBankItem is used only for showing component  */}
          <TouchableOpacity onPress={() => setSelctedBank("unicredit")}>
            {/* banks */}
            <SelectedBankItem
              image={require("@assets/dummyData/visa.png")}
              title={"Unicredit"}
              subTitle={"**********9898"}
              leftIcon={
                selectedBank == "unicredit" ? icons.checked : icons.pie_chart
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelctedBank("Poste Italiane")}>
            <SelectedBankItem
              image={require("@assets/dummyData/visa.png")}
              title={"Poste Italiane"}
              subTitle={"**********9898"}
              leftIcon={
                selectedBank == "Poste Italiane"
                  ? icons.checked
                  : icons.pie_chart
              }
            />
          </TouchableOpacity>
        </View>

        {/* Add new bank  */}
        <SelectedBankItem
          image={icons.home}
          imgStyle={{ width: 24, height: 24 }}
          title={t("addBank")}
          leftIcon={icons.right_arrow}
          containerStyle={{
            alignItems: "center",
            backgroundColor: "#F9FAFB",
            borderWidth: 0,
            height: 56,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* absolute button to set selected bank to withdraw redux   */}

          <Button
            label={t("confirm")}
            containerStyle={styles.continueButton}
            labelStyle={styles.continueButtonLabel}
            onPress={() => {
              dispatch(setWithdrawBankId(selectedBank));
              closeModel();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectBankModal;

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  continueButton: {
    width: 315,
    height: 64,
    borderRadius: 36,
    backgroundColor: COLORS.purple,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonLabel: {
    ...FONTS.h3,
    fontSize: 15,
    letterSpacing: 2,
    color: COLORS.white,
  },
});
