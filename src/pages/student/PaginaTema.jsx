import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CoursesContext";
import { useCourseContent } from "../../context/CourseContentContext";
import DetallesLeccion from "../../components/DetallesLeccion";
import BarraLateralHome from "../../components/BarraLateralHome";
import './paginaTema.css';
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguajeContext";
import { useTranslation } from "react-i18next";


const PaginaTema = () => {
    
    const navigate = useNavigate();
    const [allCompleted, setAllCompleted] = useState(true);
    const {isAuthenticated, user } = useAuth();
    const {enrolledCourses} = useCourses();
    const {
        currentTopic,
        currentTopicLessons,
        selectLesson,
        loading,
        completeTopic,
        error
    } = useCourseContent();

    const {t} = useTranslation();

    //Verificar curso existente   
    useEffect(() => {
        if(!currentTopic && !loading){
            console.log("No hay tema seleccionado, redirigiendo a curso");
            navigate('/curso');
        }
    },[currentTopic, loading, navigate]);

    //Manejar selección de lección
    const handleSelectLesson = (leccion) => {
        selectLesson(leccion);
        console.log(leccion);
        navigate('/leccion');
    }

    //Verificar si todas las lecciones están completadas
    useEffect(() => {
        if (!currentTopic || !currentTopicLessons.length || !user) return;

        let verificar = true;
        
        for (const topicLesson of currentTopicLessons) {
            console.log("Id lección: ", topicLesson.idLesson, ": ", topicLesson.completed);
            if (!topicLesson.completed) {
                verificar = false;
                break;
            }
        }
        
        console.log("¿Todas las lecciones completadas?", verificar);
        
        if (verificar && !currentTopic.completed) {
            completeTopic(user.id, currentTopic.idTopic)
                .catch(err => console.error("Error al completar el tema", err));
        }
    }, [currentTopic, currentTopicLessons, user, completeTopic]);

    if(loading){
        return <div className="loading">{t('paginaTema.loadingLessons')}</div>;
    }

    return(
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={enrolledCourses} />
                
                <div className="main-content">
                    {error && <div className="error-message">{error}</div>}
                    
                    {currentTopic && (
                        <div className="lesson-header">
                            <h1>Tema: {currentTopic.titleTopic}</h1>
                            <h2>{currentTopic.descriptionTopic}</h2>
                            <div className="progress-container">
                                <div 
                                    className="progress-bar" 
                                    // style={{ width: `${topicProgress}%` }}
                                ></div>
                            </div>
                            {/* <p className="progress-text">{topicProgress}% completado</p> */}
                            <p className="progress-text">60% {t('paginaTema.completed')}</p>
                        </div>
                    )}
                    
                    <div className="lesson-content">
                        <h2>{t('paginaTema.lessonContent')}</h2>
                        {currentTopicLessons.length > 0 ? (
                            currentTopicLessons.map(leccion => (
                                <DetallesLeccion 
                                    key={leccion.id}
                                    nombreLeccion={leccion.titleLesson}
                                    isComplete={leccion.completed}
                                    typeContent={leccion.typeContent}
                                    onAction={() => handleSelectLesson(leccion)}
                                /> 
                            ))
                        ) : (
                            <p>{t('paginaTema.noLessons')}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaTema;
