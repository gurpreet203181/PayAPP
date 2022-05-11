import "dotenv/config";

export default {
  expo: {
    name: "PayAPP",
    slug: "PayAPP",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
    extra: {
      //firbase
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      //google login
      googleAndroidKey: process.env.FIREBASE_ANDROID_KEY,
      //facebook Login
      facebookAppId: process.env.FACEBOOK_APP_ID,
    },
    plugins: [
      [
        "expo-facebook",
        {
          userTrackingPermission: false,
        },
      ],
    ],
  },
};
