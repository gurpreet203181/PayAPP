import React, { useState, useEffect } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "@constants";
import { Header, Button, FormInput } from "@components";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import { cloudFunction } from "src/config/firebase";
import { utils } from "src/utils";
const Step2 = (prop) => {
  const { user } = useSelector((state) => state?.userInfo);
  const [beneficiaryFields, setBeneficiaryFields] = useState();
  const [beneficiaryObject, setBeneficiaryObject] = useState([]);

  const [error, setError] = useState();
  useEffect(() => {
    const getFields = async () => {
      await cloudFunction
        .httpsCallable("payoutObject-get_Payout_Required_Fields")({
          user: user,
          amount: prop.getState()?.amount,
          payoutMethod: prop.getState()?.payoutMethod,
        })
        .then((response) => {
          if (response.data?.status?.status == "SUCCESS") {
            console.log(response);
            //creating beneficary object with all fields required
            let objectBeneficiary = {};
            response.data?.data?.beneficiary_required_fields.map((item) => {
              if (item?.is_required) {
                item?.name == "payment_type"
                  ? (objectBeneficiary[item?.name] = item.regex)
                  : (objectBeneficiary[item?.name] = "");
              } else null;
            });
            setBeneficiaryObject(objectBeneficiary);
            setBeneficiaryFields(
              response.data?.data?.beneficiary_required_fields
            );

            //setting sender field on props.saveState for step 3
            prop.saveState({
              senderField: response.data?.data?.sender_required_fields,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getFields();
  }, []);

  function isValid() {
    let isError = "";
    Object.entries(beneficiaryObject).forEach((item, index) => {
      const regex = new RegExp(beneficiaryFields[index].regex);
      if (!regex.test(item[1])) {
        isError = `${item[0]} is not vaild`;
      }
    });
    console.log(beneficiaryObject);
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
      await prop.saveState({ beneficiaryObject: beneficiaryObject });
      console.log("next");
      prop.next();
    }
    return false;
  };
  //input fields
  function renderInput() {
    return (
      <FlatList
        data={beneficiaryFields}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <View>
              {item?.name != "payment_type" && (
                <FormInput
                  placeholder={utils.UIName(item.name)}
                  keyboradType="default"
                  onChange={(value) => {
                    setBeneficiaryObject({
                      ...beneficiaryObject,
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
          {t("beneficiary")}
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
      {/* fields */}

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

export default Step2;

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
