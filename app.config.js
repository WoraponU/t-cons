export default {
  name: "t-cons",
  slug: "t-cons",
  version: "4.0.8",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
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
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.witeseb.tcons",
    versionCode: 4,
    config: {
      googleMaps: {
        apiKey: "AIzaSyC04B8E84MbzmNhZAnvUtPbTSom6aYJmOw",
      },
    },
    permissions: [
      "RECEIVE_BOOT_COMPLETED",
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
