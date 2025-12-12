import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN
import navbar_en from "./en/navbar.json";
import home_en from "./en/home.json";
import about_en from "./en/about.json";
import whyus_en from "./en/whyus.json";
import collections_en from "./en/collections.json";
import csr_en from "./en/csr.json";
import news_en from "./en/news.json";
import careers_en from "./en/careers.json";
import contact_en from "./en/contact.json";
import footer_en from "./en/footer.json";
import floatmessage_en from "./en/floatmessage.json";
import articleNav_en from "./en/articleNavigation.json";

// ID
import navbar_id from "./id/navbar.json";
import home_id from "./id/home.json";
import about_id from "./id/about.json";
import whyus_id from "./id/whyus.json";
import collections_id from "./id/collections.json";
import csr_id from "./id/csr.json";
import news_id from "./id/news.json";
import careers_id from "./id/careers.json";
import contact_id from "./id/contact.json";
import footer_id from "./id/footer.json";
import floatmessage_id from "./id/floatmessage.json";
import articleNav_id from "./id/articleNavigation.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      navbar: navbar_en,
      home: home_en,
      about: about_en,
      whyus: whyus_en,
      collections: collections_en,
      csr: csr_en,
      news: news_en,
      careers: careers_en,
      contact: contact_en,
      footer: footer_en,
      floatmessage: floatmessage_en,
      articleNav: articleNav_en,
    },
    id: {
      navbar: navbar_id,
      home: home_id,
      about: about_id,
      whyus: whyus_id,
      collections: collections_id,
      csr: csr_id,
      news: news_id,
      careers: careers_id,
      contact: contact_id,
      footer: footer_id,
      floatmessage: floatmessage_id,
      articleNav: articleNav_id,
    },
  },
});

export default i18n;
