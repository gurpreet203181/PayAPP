import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "@constants";
import Step1 from "./withdrawStep/step1";
import Step2 from "./withdrawStep/step2";
import Step3 from "./withdrawStep/step3";
import AnimatedMultistep from "react-native-animated-multistep";
import { useSelector } from "react-redux";
/* 
summray
Witdraw scren to let user withdraw amount from balance

*/
const WithDraw = ({ navigation }) => {
  const { user } = useSelector((state) => state?.userInfo);

  const allSteps = [
    { name: "step 1", component: Step1 },
    { name: "step 2", component: Step2 },
    { name: "step 3", component: Step3 },
  ];

  const finish = async (finalState) => {
    console.log(finalState);
    navigation.navigate("withdrawConfirmation", { finalState });
  };
  const back = (prop) => {};

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, alignItems: "center" }}
    >
      <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        // onBack={back}
        //onNext={onNext}
        comeInOnNext="bounceInUp"
        OutOnNext="bounceOutDown"
        comeInOnBack="bounceInDown"
        OutOnBack="bounceOutUp"
      />
    </View>
  );
};

export default WithDraw;
