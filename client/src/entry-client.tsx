import './index.css';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Make sure Toast styling is loaded
import { hydrateRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// Import translations
import enGlobal from './locales/en/global.json';
import enHome from './locales/en/home.json';
import frGlobal from './locales/fr/global.json';
import frHome from './locales/fr/home.json';
import enContact from "./locales/en/contact.json";
import frContact from "./locales/fr/contact.json";
import enService from "./locales/en/service.json"
import frService from "./locales/fr/service.json"
import i18next from 'i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      global: enGlobal,
      home: enHome,
      contact: enContact,
      service: enService
    },
    fr: {
      global: frGlobal,
      home: frHome,
      contact: frContact,
      service: frService
    }
  },
  lng: 'fr', // Default language (French)
  fallbackLng: 'fr', // Fallback language
  ns: ['global', 'home', "contact", "service"], // Namespaces
  defaultNS: 'global', // Default namespace
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

export default i18n;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <HelmetProvider>
    <I18nextProvider i18n={i18next}>
      <ToastContainer />
      <App />
    </I18nextProvider>
  </HelmetProvider>
  ,
);
