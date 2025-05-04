import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useLanguage } from "../../context/LanguajeContext";
import axios from 'axios';
import './login.css';
import { useTranslation } from 'react-i18next';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const {currentLanguage} = useLanguage();
    const {t}=useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {email, password});
            
            const userData = response.data;
            console.log("Respuesta del servidor: ", userData);

            if(userData && userData.token){
                login(userData.token, userData);
                console.log("Usuario autenticado: ", userData);
                console.log("Roles: ", userData.roles);

                if(userData.roles && userData.roles.includes('ROLE_STUDENT')){
                    navigate('/home');
                }else{
                    navigate('/dashboard');
                }
            }

        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            
            if (error.response) {
                // Error de respuesta del servidor
                setError(`Error de servidor: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // Error de red
                setError('No se pudo conectar con el servidor. Verifica tu conexión.');
            } else {
                // Error de configuración
                setError(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="contenedor__login">
            <LanguageSwitcher/>
            <div className="contenedor__formulario__login">
                <h2>{t('sidebar.login')}</h2>
                
                {error && <div className="alerta alerta__error">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                <div className="grupo__formulario">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                
                <div className="grupo__formulario">
                    <label htmlFor="password">Contraseña</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="boton__iniciar__sesion"
                    disabled={loading}
                >
                    {loading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
                </form>
                
                <p className="link__registro">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;