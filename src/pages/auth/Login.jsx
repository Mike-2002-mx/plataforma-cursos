import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', {email, password});
            const token = response.data.token;
            const roles = response.data.roles;
            const id = response.data.id;
            const username = response.data.username;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('id', id);

            setTimeout(() => {
                if(roles[0] === 'ROLE_INSTRUCTOR'){
                    navigate('/dashboard');
                } else{
                    navigate('/home');
                }
            }, 2000);

        } catch (error) {
            setError( 'Credenciales inválidas')
        }
    }

    return (
        <div className="contenedor__login">
            <div className="contenedor__formulario__login">
                <h2>Iniciar Sesión</h2>
                
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
                    // disabled={loading}
                >
                    Iniciar sesion
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