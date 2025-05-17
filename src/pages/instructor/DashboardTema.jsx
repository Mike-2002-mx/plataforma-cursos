import { useNavigate } from "react-router-dom";
import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";
import { useInstructorContent } from "../../context/InstructorContentContext";
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import LeccionDetallesIns from "../../components/instructor/LeccionDetallesIns";

const DashboardTema =() =>{

    const {leccionesTema, temaActual} = useInstructorContent();
    const {isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    //Verificar autenticación del usuario
    useEffect(() => {
        if(!isAuthenticated){
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);


    const navigateCrearLeccion=()=>{
        navigate('/crear-leccion')
    }

    return(
        <> 
            <div className="dashboard">
                <BarraLateralDashboard/>
                <div className="main-content">
                    <section className="section">
                        <h2 className="course-title">{temaActual.title}</h2>
                        <p className="course-description">
                            {temaActual.description}
                        </p>
                        <div className="course-stats">
                            <div className="stat">
                            <span className="stat-label">Lecciones:</span>
                            <span className="stat-value">{temaActual.totalLessons}</span>
                            </div>
                        </div>
                    </section>
                    <button 
                        className="btn-crearTema"
                        onClick={navigateCrearLeccion}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                            Agregar leccion
                    </button>
                    
                    <div className="lesson-content">
                        <h2 className="tipoContenido">Videos</h2>
                        {leccionesTema.filter(l => l.typeContent === 'VIDEO').length > 0 ? (
                            leccionesTema
                            .filter(l => l.typeContent === 'VIDEO')
                            .map(leccion => (
                                <LeccionDetallesIns 
                                key={leccion.id}
                                tituloLeccion={leccion.title}
                                tipoContenido={leccion.typeContent}
                                />
                            ))
                        ) : (
                            <p>No hay lecciones en video</p>
                        )}

                        <h2 className="tipoContenido">Infografías</h2>
                        {leccionesTema.filter(l => l.typeContent === 'PDF').length > 0 ? (
                            leccionesTema
                            .filter(l => l.typeContent === 'PDF')
                            .map(leccion => (
                                <LeccionDetallesIns 
                                key={leccion.id}
                                tituloLeccion={leccion.title}
                                tipoContenido={leccion.typeContent}
                                />
                            ))
                        ) : (
                            <p>No hay Infografías</p>
                        )}

                        <h2 className="tipoContenido">Audios</h2>
                        {leccionesTema.filter(l => l.typeContent === 'AUDIO').length > 0 ? (
                            leccionesTema
                            .filter(l => l.typeContent === 'AUDIO')
                            .map(leccion => (
                                <LeccionDetallesIns 
                                key={leccion.id}
                                tituloLeccion={leccion.title}
                                tipoContenido={leccion.typeContent}
                                />
                            ))
                        ) : (
                            <p>No hay lecciones en Audio</p>
                        )}
                    </div>

                </div>
            </div>
            
        </>
    );
};

export default DashboardTema;