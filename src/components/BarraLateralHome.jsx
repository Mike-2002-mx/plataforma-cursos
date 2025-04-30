import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './barraLateralHome.css';
import { useCourses } from '../context/CoursesContext';


const BarraLateralHome = ({}) =>{

    const navigate = useNavigate();
    const {isAuthenticated, user, logout} = useAuth();
    const {
        enrolledCourses,
        loading,
        error,
        selectCourse
    } = useCourses();
    const [avatar, setAvatar] = useState('');

    //Verificar autenticación
    useEffect(() => {
        if(!isAuthenticated){
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    },[isAuthenticated, navigate])


    //Manejar la selección del curso inscrito
    const handleSelectCourse = (curso) => {
        selectCourse(curso);
        navigate('/curso');
    };

    const naviteHome = () =>{
        navigate('/home');
    }

    //Mostrar avatar y rol
    useEffect(() =>{
        const name = user?.username
        const a = name.charAt(0);
        setAvatar(a);
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
                        <h4>{user?.username}</h4>
                        <span className="badge">Estudiante</span>
                    </div>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">Opciones</h3>
                    <button onClick={naviteHome} className="btn">
                        <span className="material-icons icon">home</span>
                        Inicio
                    </button>
                    <button className="btn">
                        <span className="material-icons icon">settings</span>
                        Ajustes
                    </button>
                </div>
                <div className="menu-section">
                    <h3 className="section-title">Mis cursos</h3>
                    {enrolledCourses && enrolledCourses.map(curso => (
                        <button 
                        className="btn"
                        onClick={() => handleSelectCourse(curso)}
                        key={curso.id}>
                        <span className="material-icons icon">book</span>
                            {curso.title}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BarraLateralHome;