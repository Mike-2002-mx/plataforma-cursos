import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import commonES from './locales/es/common.json';
import commonNAH from './locales/nah/common.json';

i18.use(initReactI18next).init({
    resources:{
        es:{
            common: commonES
        },
        nah:{
            common: commonNAH
        }
    },
    lng: 'es',
    fallbackLng: 'es',
    defaultNS: 'common',
    interpolation: {
        escapeValue: false
    }
});

export default i18;