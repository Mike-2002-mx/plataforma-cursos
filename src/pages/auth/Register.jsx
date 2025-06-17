import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
    const {login, logout} = useAuth();
    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });;
    
    const navigate = useNavigate();

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'El nombre es requerido';
                return '';

            case 'email':
                    if (!value) return 'El email es requerido';
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return 'Email inválido';
                }
                return '';

        case 'password':
                if (!value) return 'La contraseña es requerida';
                return '';

        case 'role':
                if (!value) return 'Seleccione un rol';
                return '';
            
            default:
                return '';
            }
    };
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
        ...prevData,
        [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post('https://plataformacursos-production.up.railway.app/api/auth/signup', formData);

            const loginResponse = await axios.post('https://plataformacursos-production.up.railway.app/api/auth/signin', {
                email: formData.email,
                password: formData.password,
            });

            console.log('Datos enviados en registro:', formData);
            console.log('Respuesta de registro:', response.data);
            console.log('Respuesta de login:', loginResponse.data);

            console.log('Respuesta de login:', loginResponse.data);

            login(loginResponse.data.token, loginResponse.data);
            
            if (loginResponse.data.roles.includes('ROLE_STUDENT')) {
                navigate('/home');
            } else if (loginResponse.data.roles.includes('ROLE_INSTRUCTOR')) {
                navigate('/dashboard');
            } else {
                navigate('/home');
            }
        } catch (error) {
        console.error('Error al registrar:', error);
        setMessage('Error en el registro');
        }
    };

    return (
        <div className='fondo__registro'>
            <div className="contenedor_registro">
                <h2>{t('registerUser.enterData')}</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit} className="formulario__registro">
                    <input
                    type="text"
                    name="name"
                    placeholder={t('registerUser.name')}
                    value={formData.name}
                    onChange={handleChange}
                    className="input__registro"
                    required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder={t('registerUser.email')}
                        value={formData.email}
                        onChange={handleChange}
                        className="input__registro"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder={t('registerUser.password')}
                        value={formData.password}
                        onChange={handleChange}
                        className="input__registro"
                        required
                    />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="seleccion__registro"
                            required
                        >
                            <option value="">{t('registerUser.selectRole')}</option>
                            <option value="INSTRUCTOR">{t('registerUser.instructor')}</option>
                            <option value="STUDENT">{t('registerUser.student')}</option>
                        </select>

                        <button
                            type="submit"
                            className="boton__registrar"
                        >
                        {t('registerUser.register')}
                        </button>
            </form>
            
        </div>
        </div>
    );

};

export default RegisterForm;
