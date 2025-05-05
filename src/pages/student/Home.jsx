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

    const recentActivities = [
        { id: 1, title: 'Cómo organizar mi bandeja de entrada' },
        { id: 2, title: 'Configuración de filtros avanzados' },
        { id: 3, title: 'Uso de etiquetas y categorías' }
    ];

    if (loading) {
        return <div className="loading">{t('viewHome.loadingCourses')}</div>;
    }

    return (
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={enrolledCourses} />
            
                <div className="main-content">
                    {error && <div className="error-message">{error}</div>}
                    <LanguageSwitcher/>
                    <div className="welcome-section">
                        <h1>{t('viewHome.welcome')}, {user?.username || user?.name || t('viewHome.student')}</h1>
                        <p className="subtitle">{t('viewHome.messageContinue')}</p>
                    </div>
                    
                    <h2>{t('viewHome.mesaggeMy_courses')}</h2>
                    <div className="courses-grid">
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map(curso => (
                                <TarjetaCursoHome
                                    key={curso.id}
                                    nombreCurso={curso.title}
                                    onAction={() => handleSelectCourse(curso)}
                                    isInscrito={true}
                                    imagenPortada={curso.imageUrl}
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
                    
                    <h2>{t('viewHome.availableCourses')}</h2>
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