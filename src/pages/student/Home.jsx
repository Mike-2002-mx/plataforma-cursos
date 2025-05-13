import { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SeccionProgreso from "../../components/SeccionProgreso";
import BarraLateralHome from "../../components/BarraLateralHome";
import TarjetaCursoHome from "../../components/TarjetaCursoHome";
import { useCourses } from "../../context/CoursesContext";
import { useCourseContent } from "../../context/CourseContentContext";
import axios from "axios";
import './home.css';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";


const Home =  () =>{

    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { 
        enrolledCourses, 
        availableCourses, 
        loading, 
        error, 
        selectCourse, 
        enrollInCourse 
    } = useCourses();

    const {
        lessonsComplete,
        totalLessonsComplete,
        totalTopicsComplete
    } = useCourseContent();

    const {t} = useTranslation();
    // Verificar autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Manejar selección de curso inscrito
    const handleSelectCourse = (curso) => {
        selectCourse(curso);
        console.log(localStorage.getItem('cursoActual'));
        navigate("/curso");
    };

    // Manejar inscripción a nuevo curso
    const handleEnrollCourse = async (curso) => {
        const result = await enrollInCourse(curso.id, curso);
        if (result.success) {
            navigate("/curso");
        }
    };

    

    if (loading) {
        return <div className="loading">{t('viewHome.loadingCourses')}</div>;
    }

    return (
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={enrolledCourses} />
            
                <div className="main-content">
                    {error && <div className="error-message">{error}</div>}
                    <div className="welcome-section">
                        <h1 className="welcome-continue">{t('viewHome.welcome')}, {user?.username || user?.name || t('viewHome.student')}</h1>
                        <p className="subtitle welcome-continue">{t('viewHome.messageContinue')}</p>
                    </div>
                    <h2 className="welcome-misCursos">{t('viewHome.mesaggeMy_courses')}</h2>
                    <div className="courses-grid">
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map(curso => (
                                <TarjetaCursoHome
                                    key={curso.id}
                                    nombreCurso={curso.title}
                                    isInscrito={true}
                                    imagenPortada={curso.imageUrl}
                                    instructorName={curso.instructorName}
                                    onAction={() => handleSelectCourse(curso)}
                                />
                            ))
                        ) : (
                            <p>{t('viewHome.noCoursesInProgress')}</p>
                        )}
                    </div>

                    <SeccionProgreso 
                        temasCompletados={totalTopicsComplete || 0} 
                        listaActividadesCompletadas={lessonsComplete}
                        leccionesCompletadas={totalLessonsComplete || 0 }
                    />
                    
                    <h2 className="availableCourses">{t('viewHome.availableCourses')}</h2>
                    <div className="courses-grid">
                        {availableCourses.length > 0 ? (
                            availableCourses.map(curso => (
                                <TarjetaCursoHome
                                    key={curso.id} 
                                    nombreCurso={curso.title}
                                    isInscrito={false}
                                    imagenPortada={curso.imageUrl}
                                    onAction={() => handleEnrollCourse(curso)}
                                />
                            ))
                        ) : (
                            <p>{t('viewHome.noAdditionalCourses')}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;