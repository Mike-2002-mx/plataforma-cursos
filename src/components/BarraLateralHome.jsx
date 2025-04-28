import { useEffect, useState } from 'react';
import './barraLateralHome.css';

const BarraLateralHome = () =>{

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {

        const name = localStorage.getItem('username');
        const primeraLetra = name.charAt(0);
        setNombreUsuario(name);
        setAvatar(primeraLetra);

    }, [])

    return (
        <>
            <div className="sidebar">
                <div className="logo-container">
                    <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_48dp.png" alt="Logo" className="logo"/>
                    <h1 className="course-title">Mis Cursos</h1>
                </div>
                
                <div className="user-card">
                    <div className="avatar">{avatar}</div>
                    <div className="user-info">
                        <h4>{nombreUsuario}</h4>
                        <span className="badge">Estudiante</span>
                    </div>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">Navegación</h3>
                    <button className="btn">
                        <span className="material-icons icon">home</span>
                        Inicio
                    </button>
                    <button className="btn">
                        <span className="material-icons icon">book</span>
                        Mis Cursos
                    </button>
                    <button className="btn">
                        <span className="material-icons icon">bar_chart</span>
                        Progreso
                    </button>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">Configuración</h3>
                    <button className="btn">
                        <span className="material-icons icon">settings</span>
                        Ajustes
                    </button>
                    <button className="btn btn-danger">
                        <span className="material-icons icon">logout</span>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    )
}

export default BarraLateralHome;