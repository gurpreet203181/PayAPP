import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { BackHandler } from "react-native";
const UrlWebview = ({ route, navigation }) => {
  const redirect_url = route?.params?.redirect_url;
  useEffect(() => {
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
    <WebView
      source={{ uri: redirect_url }}
      originWhitelist={[
        "intent://*",
        "payapptransaction.page.link/back",
        "payapptransaction.page.link/success",
        "payapptransaction.page.link/error_payment",
        "payapptransaction.page.link/cardAdded",
      ]}
    />
  );
};

export default UrlWebview;
