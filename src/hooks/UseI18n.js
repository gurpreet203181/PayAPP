import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import { en, it } from "../services/i18n/locales";

export const t = memoize(
  (key, config) =>
    i18n.t(key, config).includes("missing") ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const init = () => {
  let localeLanguageTag = Localization.locale;
  let isRTL = Localization.isRTL;

  t.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.fallbacks = true;
  i18n.translations = { it, en };
  i18n.locale = Localization.locale;
};
