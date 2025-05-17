import LanguageSwitcher from '../../components/LanguageSwitcher';
import {  useTranslation } from 'react-i18next';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () =>{
    
    const navigate = useNavigate();
    const {t} = useTranslation();

    const navegarInicioSesion= () =>{
        navigate("/login");
    }

    const navegarRegistro = () =>{
        navigate('/register')
    }

    return (
        <>
            <div className="contenedorTotal">
                <div className="contenedorDatos">
                    <nav>
                        {/* <img src="public/Logo.png" alt="Logo" className="logo"/> */}
                        <span>Momachtia TIC</span>
                        <div>
                            <button onClick={navegarInicioSesion} className="btn-landing">
                                {t('landing.login')}
                            </button>
                            <button className="btn-landing" onClick={navegarRegistro}>
                                {t('landing.register')}
                            </button>
                        </div>
                    </nav>
                    <main>
                        <span>{t('landing.headline')}</span>
                        <p>{t('landing.description')}</p>
                        <p>{t('landing.languageQuestion')}</p>
                        <div className="seleccionar-idioma">
                            <LanguageSwitcher/>
                        </div>
                    </main>
                </div>
                
                <div className="contenedorImagen"> 
                    <img src="public/imagen_artesanas.jpg" alt="Mujer cosiendo"/>
                </div>
            </div>
        </>
    );

};

export default Landing;