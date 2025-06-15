import {  useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import { useInstructorContent } from "../../context/InstructorContentContext";
import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";
import TarjetaCursoDashboard from "../../components/instructor/TarjetaCursoDashboard";
import './dashboard.css';
import { useTranslation } from "react-i18next";

const Dashboard = () =>{
    const navigate = useNavigate();
    const {isAuthenticated, user} = useAuth();
    const {
        instructorCourses,
        selectCourse,
        loading, 
        error
    } = useInstructorCourses();
    const [menuOpen, setMenuOpen] = useState(false);
    const {t} = useTranslation();


    //Verificar autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Manejar selección de curso
    const handleSelectCourse = (curso) => {
        selectCourse(curso);
        console.log(JSON.parse(localStorage.getItem('cursoActual')));
        navigate("/vista-curso");
    };

    const navigateCreateCuourse= () =>{
        navigate("/crear-curso");
    }

    const toggleButton = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <div className="dashboard">
                <div className="barra-mobile">
                    <button onClick={toggleButton} className="barra-mobile-button">
                        <span class="material-icons icon-mobile">menu</span>
                    </button>
                    <h1 className="page-title-mobile">Momachtia TIC</h1>
                    <img src="public/Logo.png" alt="Logo" className="logo"/>
                </div>

                <div className= {menuOpen ? 'visible': 'oculto'} >
                    <BarraLateralDashboard/>
                </div>
                <div className="main-content">
                    <div className="welcome-section">
                        <h1>{t('dashboard.welcome')} {user?.username || user?.name || 'Estudiante'}</h1>
                        <p className="subtitle">{t('dashboard.my_courses')}</p>
                    </div>
                    <button 
                        onClick={navigateCreateCuourse}
                        className="btn-crearCurso">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                            {t('dashboard.createCourse')}
                    </button>
                    <div className="contenedor-cursos">
                            {instructorCourses.map(curso => (
                                <TarjetaCursoDashboard
                                    key={curso.id}
                                    imagenPortada={curso.imageUrl}
                                    cursoTitulo={curso.title}
                                    totalAlumnos={curso.studentsEnrollments}
                                    totalTemas={curso.totalTopics}
                                    totalLecciones={curso.totalLessons}
                                    onAction={() => handleSelectCourse(curso)}
                                />
                            ))}
                        </div>                        
                </div>
            </div>
        </>
    );

};

export default Dashboard;