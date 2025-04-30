import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useCourses } from "./CoursesContext";

//Crear el contexto
const CourseContentContext = createContext();

export const CourseContentProvider = ({children}) => {

    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [topicsProgress, setTopicsProgress] = useState([]);
    const [lessonsProgress, setLessonsProgress] = useState([]);
    const [currentCourseTopics, setCurrentCourseTopics] = useState([]);
    const [currentTopicLessons, setCurrentTopicLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useAuth();
    const {currentCourse} = useCourses();

    //Cargar temas del curso
    useEffect(() => {
        const fetchTopicsProgress = async () => {
            if(!currentCourse || !user?.id || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/progressTopic/byUser/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                const allTopics = response.data;
                setTopicsProgress(allTopics);

                //Filtrar temas del curso actual
                const courseTopics = allTopics.filter(topic => topic.idCourse === currentCourse.id);
                setCurrentCourseTopics(courseTopics);

                //Restaurar tema actual desde localStorage si existe
                const saveTopic = localStorage.getItem('temaActual');
                if(saveTopic){
                    try {
                        const parsedTopic = JSON.parse(saveTopic);
                        setCurrentTopic(parsedTopic);
                    } catch (error) {
                        console.error("Error al parsear el tema guardado: ", error);
                    }
                }
            } catch (error) {
                console.error("Error al obtener temas: ", error);
                setError("Error al cargar los temas del curso");
            }finally{
                setLoading(false);
            }
        };
        fetchTopicsProgress();
    }, [currentCourse, user]);


    //Cargar lecciones cuando se selecciona un tema
    useEffect(() => {
        const fetchLessonsProgress = async () => {

            if(!currentTopic || !user?.id || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/progressLesson/byUser/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                const allLessons = response.data;
                setLessonsProgress(allLessons);


                //Filtrar lecciones del tema actual
                const topicLessons = allLessons.filter(lesson => lesson.idTopic === currentTopic.idTopic);
                setCurrentTopicLessons(topicLessons);

                //Restaurar lección actual desde localStorage si exite
                const saveLesson = localStorage.getItem('leccionActual');
                if(saveLesson){
                    try {
                        const parsedLesson = JSON.parse(saveLesson);
                        setCurrentLesson(parsedLesson);
                    } catch (error) {
                        console.error("Error al parsear lección guardada: ", error);
                    }
                }
            } catch (error) {
                console.error('Error al obtener lecciones:', error);
                setError('Error al cargar las lecciones del tema');
            }finally{
                setLoading(false);
            }
        };

        fetchLessonsProgress();
    }, [currentTopic, user]);


      // Función para seleccionar un tema
    const selectTopic = (topic) => {
        setCurrentTopic(topic);
        localStorage.setItem('temaActual', JSON.stringify(topic));
        // Resetear lección actual cuando se cambia de tema
        setCurrentLesson(null);
        localStorage.removeItem('leccionActual');
    };

    //Función para seleccionar un tema
    const selectLesson = (lesson) => {
        setCurrentLesson(lesson);
        localStorage.setItem('leccionActual', JSON.stringify(lesson));
    }

    //Marcar una lección como completada



    // Refrescar datos de progreso
    const refreshProgress = async () => {
        setLoading(true);
        
        try {
        // Refrescar temas
        if (currentCourse?.id && user?.id) {
            const topicsResponse = await axios.get(`http://localhost:8080/progressTopic/byUser/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
            });
            
            const allTopics = topicsResponse.data;
            setTopicsProgress(allTopics);
            
            const courseTopics = allTopics.filter(topic => topic.idCourse === currentCourse.id);
            setCurrentCourseTopics(courseTopics);
        }
        
        // Refrescar lecciones
        if (currentTopic?.idTopic && user?.id) {
            const lessonsResponse = await axios.get(`http://localhost:8080/progressLesson/byUser/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
            });
            
            const allLessons = lessonsResponse.data;
            setLessonsProgress(allLessons);
            
            const topicLessons = allLessons.filter(lesson => lesson.idTopic === currentTopic.idTopic);
            setCurrentTopicLessons(topicLessons);
        }
        } catch (error) {
        console.error('Error al refrescar progreso:', error);
        setError('Error al actualizar el progreso');
        } finally {
        setLoading(false);
        }
    };

    return (
        <CourseContentContext.Provider
            value={{
                currentTopic,
                currentLesson,
                topicsProgress,
                lessonsProgress,
                currentCourseTopics,
                currentTopicLessons,
                loading,
                error,
                selectTopic,
                selectLesson,
                // completeLesson,
                // checkTopicCompletion,
                // calculateCourseProgress,
                // calculateTopicProgress,
                refreshProgress
            }}
        >
            {children}
        </CourseContentContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useCourseContent = () => {
    const context = useContext(CourseContentContext);
    if (!context) {
        throw new Error('useCourseContent debe ser usado dentro de un CourseContentProvider');
    }
    return context;
};