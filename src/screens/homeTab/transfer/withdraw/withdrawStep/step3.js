import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Header, Button, FormInput } from "@components";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const Step3 = (prop) => {
  const { user } = useSelector((state) => state?.userInfo);
  const [senderObject, setSenderObject] = useState([]);
  const [senderField, setSenderField] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const senderField = prop.getState()?.senderField;
    setSenderField(senderField);
    console.log(senderField);
    let objectSender = {};
    senderField.map((item) => {
      if (item?.is_required) {
        item?.name == "country"
          ? (objectSender[item?.name] = user?.country)
          : (objectSender[item?.name] = "");
      } else null;
    });
    setSenderObject(objectSender);
  }, []);

  function isValid() {
    let isError = "";
    Object.entries(senderObject).forEach((item, index) => {
      const regex = new RegExp(senderField[index].regex);
      if (!regex.test(item[1])) {
        isError = `${item[0]} is not vaild`;
      }
    });
    console.log(senderObject);
    if (isError == "") {
      return true;
    } else {
      showMessage({
        message: isError,
        type: "danger",
      });
    }

    return false;
  }

  const onContinuePress = async () => {
    if (isValid()) {
      await prop.saveState({ senderObject: senderObject });
      console.log("next");
      prop.next();
    }
    return false;
  };
  //input fields
  function renderInput() {
    return (
      <FlatList
        data={senderField}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View>
              {item?.name != "country" && (
                <FormInput
                  placeholder={item.name}
                  keyboradType="default"
                  onChange={(value) => {
                    setSenderObject({
                      ...senderObject,
                      [item?.name]: value,
                    });
                  }}
                />
              )}
            </View>
          );
        }}
      />
    );
  }
  return (
    <View style={{ ...SIZES.marginHorizontal }}>
      {/* title and subtitle */}
      <View style={styles.TitleContainer}>
        <Text style={styles.title} adjustsFontSizeToFit>
          {t("sender")}
        </Text>
        <Button onPress={() => prop?.back()} label={t("back")} />
      </View>
      <Text
        style={{ ...FONTS.body5, color: COLORS.gray2 }}
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {t("witdrawSubtitle")}
      </Text>
      {/* render input fields */}
      <View>{renderInput()}</View>
      <Button
        label={t("next")}
        labelStyle={{ ...styles.SignInText }}
        containerStyle={{ ...styles.SignInButton, ...styles.shadow }}
        onPress={() => {
          onContinuePress();
        }}
      />
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  TitleContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  title: {
    ...FONTS.h5,
    fontSize: 24,
    paddingTop: 10,
    color: COLORS.darkBlue3,
  },
  shadow: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 5,
  },

  SignInButton: {
    backgroundColor: COLORS.darkBlue3,
    width: 327,
    height: 56,
    borderRadius: 16,
    marginTop: "10%",
  },
  SignInText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontSize: 15,
  },
});
