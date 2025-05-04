import { createContext, useContext, useState, useEffect } from "react";
import i18 from "../i18n/config";

const LanguageContext = createContext();

export const LanguageProvider = ({children}) =>{
    const [currentLanguage, setCurrentLanguage] = useState(i18.language);

    const changeLanguage = (lng) =>{
        i18.changeLanguage(lng).then(() => {
            setCurrentLanguage(lng);
            localStorage.setItem('appLanguage',lng);
        });
    };

    useEffect(() => {
        const saveLang = localStorage.getItem('appLanguage');
        if(saveLang){
            changeLanguage(saveLang);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);