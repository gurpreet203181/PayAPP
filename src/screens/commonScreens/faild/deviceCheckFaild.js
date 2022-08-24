import React from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { COLORS, FONTS, SIZES } from "@constants";
import Modal from "react-native-modal";
const DeviceCheckFaild = ({ isVisible }) => {
  React.useEffect(() => {
    //backhandler to disable back button on device so user can't go back from  success screen
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      style={{ flex: 1, margin: 0, backgroundColor: COLORS.white }}
    >
      <View style={styles.view}>
        <Text style={{ ...styles.successText, color: COLORS.red }}>
          App access failed
        </Text>
        <Text style={styles.successText2}>This is might be reason:</Text>
        <Text style={styles.successText2}>Device is using jailbreker</Text>
        <Text style={styles.successText2}>Device is mocking location:</Text>
        <Text style={styles.successText2}>Debug mode is actived</Text>
        <Text style={styles.successText2}>
          Is Android Debug Bridge enabled.
        </Text>
        <Text style={styles.successText2}>
          Is the application running on external storage (ie. SD Card)
        </Text>
        <Text style={styles.successText2}>
          Detects if there is any suspicious installed applications.
        </Text>
      </View>
    </Modal>
  );
};

export default DeviceCheckFaild;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    marginTop: 40,
    ...FONTS.h4,
    letterSpacing: 0.3,
    fontSize: 20,
  },
  successText2: {
    ...FONTS.body3,
    fontSize: 14,
    color: COLORS.black,
    opacity: 0.5,
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: COLORS.darkBlue3,
    width: 200,
    height: 62,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: COLORS.white,
    ...FONTS.body3,
    fontSize: 18,
  },
});
