import { COLORS } from "@constants";
import { t } from "@hooks/UseI18n";
import React from "react";
import { View } from "react-native";
import { icons } from "@constants";
import { Header } from "@components";

const EditAccount = ({ navigation }) => {
  //render
  function renderHeader() {
    return (
      <Header
        title={t("editAccount")}
        rightIcon={icons.close}
        onRightIconPress={() => navigation.goBack()}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* header */}
      {renderHeader()}
    </View>
  );
};

export default EditAccount;
