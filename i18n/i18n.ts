import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    resources: {
        pt: {
          translation: pt
        }
    }
  });

export default i18n;