import { useLanguage } from "../context/LanguajeContext";
import { useTranslation } from "react-i18next";
import './languageSwitcher.css';

const LanguageSwitcher = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <div className="language-switcher">
            <button 
                onClick={() => changeLanguage('es')}
                className={currentLanguage === 'es' ? 'active' : ''}
            >
                {t('common:Español')}
            </button>
            <button 
                onClick={() => changeLanguage('nah')}
                className={currentLanguage === 'nah' ? 'active' : ''}
            >
                {t('common:Náhuatl')}
            </button>
        </div>
    );
};

export default LanguageSwitcher;