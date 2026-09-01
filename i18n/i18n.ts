import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    load: 'languageOnly',
    resources: {
        pt: {
          translation: pt
        },
        en: {
          translation: en
        }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;