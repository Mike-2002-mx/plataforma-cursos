import { useStatem, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";
import TarjetaCursoHome from "../../components/TarjetaCursoHome";
import TarjetaCursoDashboard from "../../components/instructor/TarjetaCursoDashboard";
import './dashboard.css';

const Dashboard = () =>{
    const navigate = useNavigate();
    const {isAuthenticated, user} = useAuth();
    const {
        instructorCourses,
        loading, 
        error
    } = useInstructorCourses();

    //Verificar autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);




    return (
        <>
            <div className="dashboard">
                <BarraLateralDashboard/>
                <div className="main-content">
                    <div className="welcome-section">
                        <h1>Bienvenida, {user?.username || user?.name || 'Estudiante'}</h1>
                        <p className="subtitle">Estos son tus cursos actuales</p>

                        <div className="contenedor-cursos">
                            {instructorCourses.map(curso => (
                                <TarjetaCursoDashboard
                                    key={curso.id}
                                    imagenPortada={curso.imageUrl}
                                    cursoTitulo={curso.title}
                                    totalAlumnos={10}
                                    totalTemas={10}
                                />
                            ))}
                        </div>
                        <button class="btn-crearCurso">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                            Crear Curso
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    );

};

export default Dashboard;