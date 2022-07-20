import React, { useState, useEffect, useMemo } from "react";
import { t } from "@hooks/UseI18n";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, icons, SIZES, FONTS } from "@constants";
import Modal from "react-native-modal";
import { firebaseAuth } from "src/config/firebase";
import AnimatedMultistep from "react-native-animated-multistep";

const Step1 = () => {
  return (
    <View>
      <Text>hey </Text>
    </View>
  );
};
const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Step1 },
  { name: "step 3", component: Step1 },
  { name: "step 4", component: Step1 },
];

const MultistepFormModal = ({ isVisible, closeModel }) => {
  const currentUser = firebaseAuth.currentUser;

  const onNext = () => {
    console.log("Next");
  };

  /* define the method to be called when you go on back step */

  const onBack = () => {
    console.log("Back");
  };

  /* define the method to be called when the wizard is finished */

  const finish = (finalState) => {
    console.log(finalState);
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={closeModel} //onClosepress function to close model by changes isvisible value
      onBackdropPress={closeModel}
      useNativeDriver={true}
      propagateSwipe
      style={styles.view}
    >
      <View style={{ flex: 1 }}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={finish}
          onBack={onBack}
          onNext={onNext}
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

const styles = StyleSheet.create({});
