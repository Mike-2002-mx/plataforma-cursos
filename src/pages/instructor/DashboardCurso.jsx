import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";
import TarjetaAlumno from "../../components/instructor/TarjetaAlumno";
import TemaDetallesIns from "../../components/instructor/TemaDetallesIns";
import './dashboardCurso.css';
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import { useInstructorContent } from "../../context/InstructorContentContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState} from "react";

const DashboardCurso = () => {

    const {currentCourse} = useInstructorCourses();
    const {
        estudiantesInscritos,
        totalInscritos, 
        temasCurso, 
        totalTemas,
        selectTopic,
    } = useInstructorContent();
    const navigate = useNavigate();

    const {user, isAuthenticated}= useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    //Verificar autenticación
        useEffect(() => {
            if (!isAuthenticated) {
                console.log("Usuario no autenticado, redirigiendo a login");
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

    //Navegar a crear tema
    const navigateCrearTema =() =>{
        navigate("/crear-tema");
    }

    //Manejar la selección de tema
    const handleSelectTopic = (tema) =>{
        selectTopic(tema);
        console.log(JSON.parse(localStorage.getItem('temaActual')));
        navigate("/vista-tema");
    };

    const toggleButton = () => {
        setMenuOpen(!menuOpen);
    }
    
    return(
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
                    <section className="section">
                        <h2 className="course-title">{currentCourse.title}</h2>
                        <p className="course-description">
                            {currentCourse.description}
                        </p>
                        <div className="course-stats">
                            <div className="stat">
                            <span className="stat-label">Alumnos inscritos:</span>
                            <span className="stat-value">{totalInscritos}</span>
                            </div>
                            <div className="stat">
                            <span className="stat-label">Temas:</span>
                            <span className="stat-value">{totalTemas}</span>
                            </div>
                        </div>
                    </section>
                    <div className="section">
                        <div className="section-header">
                            <h2>Alumnos inscritos</h2>
                        </div>

                        <div className="students-grid">
                            {estudiantesInscritos.map(estudiante =>(
                                <TarjetaAlumno
                                    key={estudiante.idUser}
                                    nombreAlumno={estudiante.userName}
                                    
                                />
                            ))}
                        </div>


                    </div>
                    <button 
                        className="btn-crearTema"
                        onClick={navigateCrearTema}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                            Agregar tema
                    </button>
                    <div className="section">
                        <div className="section-header">
                            <h2>Temas del curso</h2>
                        </div>
                        {temasCurso && temasCurso.length > 0 ? (
                            temasCurso.map(tema => (
                                <TemaDetallesIns
                                    key={tema.id} 
                                    tituloTema={tema.title}
                                    totalLecciones={tema.totalLessons}
                                    onAction={() => handleSelectTopic(tema)} 
                                />
                            ))
                        ) : (
                            <p>No hay temas aún.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardCurso;