module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@redux": "./src/redux",
            "@reduxReducers": "./src/redux/reducers",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@utlis": "./src/utlis",

            //screens alias screens which other folder inside
            "@commonScreens": "@screens/CommonScreens",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
