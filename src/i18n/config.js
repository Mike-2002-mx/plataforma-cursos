import i18 from "i18next";
import { initReactI18next } from "react-i18next";

i18.use(initReactI18next).init({
    resources:{
        es:{
            common:{
                welcome: "Bienvenida"
            }
        },
        nah:{
            common:{
                welcome: "Niltze"
            }
        }
    },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
        escapeValue: false
    }
});

export default i18;