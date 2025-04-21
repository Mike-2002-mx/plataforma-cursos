import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const RegisterForm = () => {
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
        const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
        console.log(response);
        setMessage('Registro exitoso');
        setTimeout(()=> {
            navigate('/login');
        });

        console.log('Respuesta del servidor:', response.data);
        } catch (error) {
        console.error('Error al registrar:', error);
        setMessage('Error en el registro');
        }
    };

    return (
        <div className="contenedor_registro">
                <h2>Registro</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit} className="formulario__registro">
                    <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="input__registro"
                    required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="input__registro"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
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
                    <option value="">Selecciona un rol</option>
                    <option value="ROLE_INSTRUCTOR">Instructor</option>
                    <option value="ROLE_STUDENT">Estudiante</option>
                </select>

                <button
                    type="submit"
                    className="boton__registrar"
                >
                Registrarse
                </button>
            </form>
        </div>
    );

};

export default RegisterForm;
