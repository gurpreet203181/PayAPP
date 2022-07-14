import "dotenv/config";

export default {
  expo: {
    name: "Zemmo Pay",
    slug: "ZemmoPay",
    version: "1.0.4",
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
      bundleIdentifier: "com.payapp.live",
      buildNumber: "1.0.4",
    },
    android: {
      package: "com.payapp.live",
      googleServicesFile: "./google-services.json",
      versionCode: 5,
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

      //twilio
      twilioBaseUrl: process.env.TWILIO_BASE_URL,
      twilioSendgridKey: process.env.TWILIO_SENDGRID_KEY,

      //emailJs
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,

      //Rapyd

      rapyd_access_key: process.env.RAPYD_ACCESS_KEY,
      rapyd_secret_key: process.env.RAPYD_SECRET_KEY,
      rapyd_base_uri: process.env.RAPYD_BASE_URI,
    },
    plugins: [
      [
        "expo-facebook",
        {
          userTrackingPermission: false,
        },
      ],
      "@react-native-firebase/app",
    ],
  },
};
