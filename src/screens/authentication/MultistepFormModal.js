import React, { useEffect, useState } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "@constants";
import Modal from "react-native-modal";
import { firebaseAuth, firestoreDb } from "src/config/firebase";
import AnimatedMultistep from "react-native-animated-multistep";
import { Button, FormInput } from "@components";
import { utils } from "src/utils";
import DropDownPicker from "react-native-dropdown-picker";
import countriesData from "@constants/countriesData.json";
const Step1 = (prop) => {
  const [error, setError] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const onPressNext = async () => {
    const username = prop.getState()?.username;
    console.log(username);
    if (username?.trim().length < 3 || username == undefined) {
      setError(t("usernameError"));
      setButtonDisable(false);

      return;
    }

    //checking if username is used
    //if not saving in prop state to get on function onfinsh()
    const response = await utils.isUsernameUsed(username);
    console.log(response);
    if (response == false) {
      prop.saveState({ username: username.trim() });
      prop.next();
    } else {
      setError(t("usernameTaken"));
      setButtonDisable(false);

      return;
    }
  };
  return (
    <View style={{ justifyContent: "center", ...SIZES.marginHorizontal }}>
      {/* Title && subtitle */}
      <View style={styles.TitleContainer}>
        <Text style={styles.title} adjustsFontSizeToFit>
          {t("username")}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FormInput
          value={prop.getState()?.username}
          placeholder={t("username")}
          keyboradType="default"
          onChange={(value) => {
            prop.saveState({ username: value.trim() });
            setError("");
            // setEmail(value);
            //setEmailError();
          }}
          errorMsg={error}
        />
      </View>
      <Text
        style={{ ...FONTS.body5, color: COLORS.gray2 }}
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {t("usernameUnique")}
      </Text>
      <Button
        label={t("next")}
        labelStyle={{ ...styles.SignInText }}
        containerStyle={{ ...styles.SignInButton, ...styles.shadow }}
        onPress={() => {
          setButtonDisable(true);
          onPressNext();
        }}
        disabled={buttonDisable}
      />
    </View>
  );
};

const Step2 = (prop) => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const data = [];
    countriesData?.data.map((item) => {
      if (item.currency_name == "Euro" || item.currency_name == "US Dollar") {
        data.push({
          label: item.name,
          value: item.name,
        });
      }
    });
    setItems(data);
  }, []);
  const onPressConfirm = async () => {
    if (value != null) {
      console.log(value);
      const countryData = countriesData?.data.filter((x) => x.name == value);
      console.log(countryData);
      await prop.saveState({ country: countryData?.[0]?.iso_alpha2 });
      await prop.saveState({ currency: countryData?.[0]?.currency_code });
      prop.next(); //as a last step it'll triger finish function
    }
  };
  return (
    <View style={{ justifyContent: "center", ...SIZES.marginHorizontal }}>
      {/* Title && subtitle */}
      <View style={styles.TitleContainer}>
        <Text style={styles.title} adjustsFontSizeToFit>
          {t("country")}
        </Text>
        <Button onPress={() => prop.back()} label={t("back")} />
      </View>

      <View
        style={{ flexDirection: "row", marginTop: 40, alignItems: "center" }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={t("selectCountry")}
          searchable={true}
        />
      </View>
      <Text
        style={{ ...FONTS.body5, color: COLORS.gray2 }}
        adjustsFontSizeToFit
        numberOfLines={2}
      >
        {t("countryAbout")}
      </Text>
      <Button
        label={t("confirm")}
        labelStyle={{ ...styles.SignInText }}
        containerStyle={{ ...styles.SignInButton, ...styles.shadow }}
        onPress={onPressConfirm}
        disabled={value == null ? true : false}
      />
    </View>
  );
};
const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Step2 },
];

const MultistepFormModal = ({ isVisible, closeModel }) => {
  /* define the method to be called when the wizard is finished */
  const finish = async (finalState) => {
    console.log(finalState);

    await firestoreDb
      .collection("users")
      .doc(firebaseAuth.currentUser.uid)
      .update({
        username: finalState?.username,
        currency: finalState?.currency,
        country: finalState?.country,
      })
      .then((response) => {
        console.log(response);
        closeModel(); //closing modal
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Modal
      isVisible={isVisible}
      // onBackButtonPress={closeModel} //onClosepress function to close model by changes isvisible value
      //onBackdropPress={closeModel}
      useNativeDriver={true}
      //propagateSwipe
      style={{ margin: 0 }}
    >
      {console.log(isVisible)}

      <View style={styles.container}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={finish}
          //  onBack={onBack}
          //onNext={onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
        />
      </View>
    </Modal>
  );
};
export default MultistepFormModal;

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
    marginTop: "70%",
  },
  SignInText: {
    color: COLORS.white,
    ...FONTS.h4,
    fontSize: 15,
  },
});
