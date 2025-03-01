import english from "../locales/english.json";
import arabic from "../locales/arabic.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const i18n_init = () => {
  // i18n for translation
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: english,
        },
        ar: {
          translation: arabic,
        },
      },
      lng: localStorage.getItem("i18nextLng") || "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    })
    .then(() => {
      document.documentElement.setAttribute(
        "dir",
        i18n.language === "ar" ? "rtl" : "ltr"
      );

      i18n.on("languageChanged", (lng) => {
        document.documentElement.setAttribute(
          "dir",
          lng === "ar" ? "rtl" : "ltr"
        );
      });
    });
};
