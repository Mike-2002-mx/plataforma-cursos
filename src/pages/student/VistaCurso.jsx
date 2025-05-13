import { useEffect, useState } from "react";
import TarjetaPresentacionCurso from "../../components/TarjetaPresentacionCurso";
import axios from "axios";
import './vistaCurso.css';
import DetallesTema from "../../components/DetallesTema";
import { useNavigate } from "react-router-dom";
import BarraLateralHome from "../../components/BarraLateralHome";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { useCourseContent } from "../../context/CourseContentContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguajeContext";


const VistaCurso = () => {

    const navigate = useNavigate();
    const {user, isAuthenticated }= useAuth();
    const {currentCourse, enrolledCourses} = useCourses();
    const {
        currentCourseTopics, 
        selectTopic, 
        loading, 
        error
    } = useCourseContent();
    const { currentLanguage, changeLanguage } = useLanguage();
    const {t} = useTranslation();
    
    //Verificar autenticación del usuario
    useEffect(() => {
        if(!isAuthenticated){
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    //Verificar si hay curso seleccionado
    useEffect(() => {
        if(!currentCourse & !loading){
            console.log("No hay curso seleccionado, redirigiendo a home");
            navigate('/home');
        }
    },  [currentCourse, loading, navigate, currentLanguage]);

    //Manejar seleccion de tema
    const handleSelectTopic = (tema) =>{
        selectTopic(tema);
        navigate('/tema');
    }

    if(loading){
        return <div className="loading">{t('vistaCurso.loadingTopics')}</div>;
    }

    return (
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={enrolledCourses} />
                
                <div className="main-content">
                    {error && <div className="error-message">{error}</div>}
                    {currentCourse && (
                        <TarjetaPresentacionCurso
                            imagenCurso={currentCourse.imageUrl}
                            nombreCurso={currentCourse.title}
                            descripcionCurso={currentCourse.description}
                            nombreAutor={currentCourse.instructorName}
                            cantidadTemas={currentCourseTopics.length}
                            // progreso={calculateCourseProgress()}
                        />
                    )}
                    <h2 className="tituloTemasCurso">{t('vistaCurso.courseTopics')}</h2>
                    {currentCourseTopics.length > 0 ? (
                        
                        currentCourseTopics.map(tema => (
                            <DetallesTema
                                key={tema.idTopic}
                                tituloTema={tema.titleTopic}
                                totalLecciones={tema.totalLessons}
                                isComplete={tema.completed}
                                onAction={() => handleSelectTopic(tema)}
                            />
                        ))
                    ) : (
                        <p>{t('vistaCurso.noTopics')}</p>
                    )}
                    
                </div>
            </div>
        </>
    );
};

export default VistaCurso;