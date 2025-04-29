import { useEffect, useState } from 'react';
import './barraLateralHome.css';
import { useNavigate } from 'react-router-dom';
const BarraLateralHome = ({cursosInscritos}) =>{

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        console.log("Cerrando sesión...");
        navigate('/login')
    }

    const volverInicio = () =>{
        navigate('/home');
    }

    const cambiarCurso = (curso) =>{
        localStorage.setItem('cursoActual', JSON.stringify(curso));
        console.log("Cambiando curso");
        navigate("/curso"); 
    }

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
                    <img src="https://cdn-icons-png.flaticon.com/512/5186/5186387.png" alt="Logo" className="logo"/>
                    <h1 className="course-title">Página de inicio</h1>
                </div>
                
                <div className="user-card">
                    <div className="avatar">{avatar}</div>
                    <div className="user-info">
                        <h4>{nombreUsuario}</h4>
                        <span className="badge">Estudiante</span>
                    </div>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">Mis cursos</h3>
                    {cursosInscritos && cursosInscritos.map(curso => (
                        <button 
                        className="btn"
                        onClick={() => cambiarCurso(curso)}
                        key={curso.id}>
                        <span className="material-icons icon">book</span>
                            {curso.title}
                        </button>
                    ))}
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">Opciones</h3>
                    <button onClick={volverInicio} className="btn">
                        <span className="material-icons icon">home</span>
                        Inicio
                    </button>
                    <button className="btn">
                        <span className="material-icons icon">settings</span>
                        Ajustes
                    </button>
                    <button onClick={logout} className="btn btn-danger">
                        <span className="material-icons icon">logout</span>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    )
}

export default BarraLateralHome;