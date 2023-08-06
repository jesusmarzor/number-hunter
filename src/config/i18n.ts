import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_es from "@/assets/translations/es.json";
import translation_en from "@/assets/translations/en.json";
import { LANGUAGES } from "@/utils/constants";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ES: {
        translation: translation_es
      },
      EN: {
        translation: translation_en
      }
    },
    lng: localStorage.getItem('lang') || LANGUAGES.ES,
    fallbackLng: LANGUAGES.ES,

    interpolation: {
      escapeValue: false
    }
});