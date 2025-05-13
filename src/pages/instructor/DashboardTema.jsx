import { useNavigate } from "react-router-dom";
import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";


const DashboardTema =() =>{

    const navigate = useNavigate();
    const navigateCrearLeccion=()=>{
        navigate('/crear-leccion')
    }

    return(
        <> 
            <div className="dashboard">
                <BarraLateralDashboard/>
                <div className="main-content">
                    {/* <section className="section">
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
                    </section> */}
                    <button onClick={navigateCrearLeccion}>
                        Agregar lección
                    </button>
                </div>
            </div>
            
        </>
    );
};

export default DashboardTema;