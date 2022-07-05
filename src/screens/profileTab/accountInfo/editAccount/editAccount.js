import React, { useEffect, useState, useRef } from "react";
import { t } from "@hooks/UseI18n";
import { ScrollView, View, Text, StyleSheet, TextInput } from "react-native";
import { COLORS, FONTS } from "@constants";
import { icons, SIZES } from "@constants";
import { FormInput, Header, Button, Loading } from "@components";
import PhoneInput from "react-native-phone-number-input";

//firbase
import { firestoreDb, auth } from "src/config/firebase";

//twilio api function
import { sendSmsVerification } from "../../../../api/twilio/verify";
import { utils } from "src/utils";
import { update_Personal_Wallet } from "src/api/rapyd/walletObject";

const EditAccount = ({ navigation, route }) => {
  const user = route?.params?.user;

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
  });

  const [error, setError] = useState();

  const phoneInput = useRef();
  const [invalidNumber, setinvalidNumber] = useState(false);

  useEffect(() => {
    //updating user value
    const updateInputFields = () => {
      setValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        ewalletId: user?.ewalletId,
      });
    };

    updateInputFields();
  }, []);

  //sending verfication otp to user phone number
  const sendSms = () => {
    sendSmsVerification(value.phoneNumber).then((response) => {
      if (response.success) {
        setLoading(false);
        navigation.navigate("Otp", { phoneNumber: value.phoneNumber });
      } else {
        setError(t("invaildNumber"));
      }
      /*  response.success 
        ?
        : setError(t("invaildNumber"));*/
    });
  };

  //updating databse
  const updateDatabase = async () => {
    try {
      const currentUser = auth.currentUser;

      // checking if user input field (firtName, LASTnAME, username,email,phone number)
      // are correct
      if (utils.editAccountValidateCredentials(value, setError)) {
        //checking if user has number verified whcih mean user has number in database
        // or user want to change number so his number enter is not same has in databse
        setLoading(true);

        if (
          !user?.phoneNumberVerified ||
          !value.phoneNumber == user?.phoneNumber
        ) {
          //updating name ,username and phonenumebr
          await firestoreDb.collection("users").doc(currentUser?.uid).update({
            firstName: value.firstName,
            lastName: value.lastName,
            username: value.username,
          });
          update_Personal_Wallet(value);

          sendSms();
          // sending otp code to user to verifiy number
        } else {
          //updating only name and username
          await firestoreDb.collection("users").doc(currentUser?.uid).update({
            firstName: value.firstName,
            lastName: value.lastName,
            username: value.username,
          });

          navigation.goBack();
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
      {error && (
        <View style={{ ...SIZES.marginHorizontal, marginTop: 12 }}>
          <Text style={styles.erroMsg}>{error}</Text>
        </View>
      )}
      <ScrollView
        style={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ ...SIZES.marginHorizontal }}>
          {/* first name */}
          <Text style={styles.inputLabel}>{t("firstName")}</Text>
          <FormInput
            textContainerStyle={{ borderBottomColor: COLORS.white }}
            inputStyle={styles.inputConatainer}
            autoCapitalize={"words"}
            value={value.firstName}
            onChange={(text) => setValue({ ...value, firstName: text })}
          />

          {/* Last name */}
          <Text style={styles.inputLabel}>{t("lastName")}</Text>
          <FormInput
            textContainerStyle={{ borderBottomColor: COLORS.white }}
            inputStyle={styles.inputConatainer}
            autoCapitalize={"words"}
            value={value.lastName}
            onChange={(text) => setValue({ ...value, lastName: text })}
          />

          {/* Userame */}
          <Text style={styles.inputLabel}>{t("username")}</Text>
          <FormInput
            textContainerStyle={{ borderBottomColor: COLORS.white }}
            inputStyle={styles.inputConatainer}
            autoCapitalize={"words"}
            value={value.username}
            onChange={(text) => setValue({ ...value, username: text })}
          />

          {/* Phone  number */}
          <Text style={styles.inputLabel}>{t("phoneNumber")}</Text>

          <PhoneInput
            ref={phoneInput}
            value={value?.phoneNumber}
            defaultCode="IT"
            layout="first"
            placeholder=" "
            onChangeText={() => setError()}
            onChangeFormattedText={(text) => {
              setValue({ ...value, phoneNumber: text });
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            containerStyle={{ marginTop: 12 }}
            textContainerStyle={[styles.inputConatainer, { marginTop: 0 }]}
          />

          {/* email */}
          {/* <Text style={styles.inputLabel}>{t("email")}</Text>
          <FormInput
            keyboradType="email-address"
            autoCompleteType="email"
            textContainerStyle={{ borderBottomColor: COLORS.white }}
            inputStyle={styles.inputConatainer}
            autoCapitalize={"words"}
            value={value.email}
            onChange={(text) => setValue({ ...value, email: text })}
          /> */}

          <Button
            containerStyle={styles.editButton}
            labelStyle={styles.editButtonLabel}
            label={t("save")}
            onPress={() => {
              updateDatabase();
            }}
          />
        </View>
      </ScrollView>

      {loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    ...FONTS.h5,
    fontSize: 14,
    marginTop: 24,
    color: COLORS.lightGray3,
  },
  inputConatainer: {
    width: 327,
    borderRadius: 16,
    backgroundColor: COLORS.white3,
    marginTop: 12,
    marginLeft: 0,
    padding: 16,
    width: "100%",
    ...FONTS.body2,
    fontSize: 14,
    color: COLORS.darkBlue3,
  },
  editButton: {
    marginTop: 34,
    height: 56,
    width: 327,
    borderRadius: 16,
    backgroundColor: COLORS.darkBlue3,
    marginBottom: 20,
    alignSelf: "center",
  },
  editButtonLabel: {
    color: COLORS.white,
    ...FONTS.h5,
    fontSize: 15,
  },
  erroMsg: {
    paddingTop: 20,
    textAlign: "center",
    color: COLORS.red,
    ...FONTS.body5,
  },
});
export default EditAccount;
