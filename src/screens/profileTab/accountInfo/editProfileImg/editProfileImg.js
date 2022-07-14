import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Header } from "@components";
import { COLORS, icons } from "@constants";
import { t } from "@hooks/UseI18n";
//reducer
import { useSelector } from "react-redux";
//avater
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import { SvgXml } from "react-native-svg";
//firebase
import { utils } from "@react-native-firebase/app";

import { firebaseAuth, storage, firestoreDb } from "src/config/firebase";
const EditProfileImg = ({ navigation }) => {
  const name = useSelector((state) => state.userInfo.user.username);

  const [svg, setSvg] = useState();

  //upload svg file to sirebase storage

  const uploadSvg = async () => {
    const task = storage.ref("boy.png").put("@assets/images/boy.png", {
      contentType: "image/png",
    });
    // set progress state
    task.on("state_changed", (snapshot) => {});
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
  };
  const url = async () => {
    const url = await storage.ref("boy.png").getDownloadURL();
  };
  // function to Generate random avatar
  const createRandomAvatar = () => {
    var RandomNumber = Math.floor(Math.random() * 100000) + 1;
    let svg = createAvatar(style, {
      seed: name + RandomNumber,

      backgroundColor:
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ")",
      radius: 50,
      translateY: 5, // ... and other options
    });
    setSvg(svg);
  };
  //render
  function renderHeader() {
    return (
      <Header
        // title={t("accountInfo")}
        leftIcon={icons.left_arrow}
        leftIconStyle={{ tintColor: COLORS.white }}
        onLeftIconPress={() => navigation.popToTop()}
      />
    );
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.darkBlue2,
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* header */}
      {renderHeader()}

      <Text>
        {t("selectImg", {
          name: name,
        })}
      </Text>
      {/* svg  */}
      <SvgXml xml={svg ? svg : null} width="30%" height="50%" />

      <Button label={"create"} onPress={createRandomAvatar} />
      <Button label={"save"} onPress={uploadSvg} />
      <Button label={"url"} onPress={url} />
    </View>
  );
};

export default EditProfileImg;
