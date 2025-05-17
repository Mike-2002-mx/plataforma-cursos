import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useCourses } from "./CoursesContext";
import { useLanguage } from "./LanguajeContext";

//Crear el contexto
const CourseContentContext = createContext();

export const CourseContentProvider = ({children}) => {

    
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [topicsProgress, setTopicsProgress] = useState([]);
    const [lessonsProgress, setLessonsProgress] = useState([]);
    const [currentCourseTopics, setCurrentCourseTopics] = useState([]);
    const [currentTopicLessons, setCurrentTopicLessons] = useState([]);

    const [totalLessonsComplete, setTotalLessonsComplete] = useState(0);
    const [lessonsComplete, setLessonsComplete] = useState([]);
    
    const [totalTopicsComplete, setTotalTopicsComplete] = useState(0);
    const [topicsComplete, setTopicsComplete] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useAuth();
    const {currentCourse} = useCourses();
    const {currentLanguage } = useLanguage();

    //Cargar temas del curso
    useEffect(() => {
        const fetchTopicsProgress = async () => {
            if(!currentCourse || !user?.id || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/progressTopic/byUserAndLanguage/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Accept-Language': currentLanguage
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

    //Lecciones completadas
    useEffect(() => {
        const fetchLessonsCompleted = async () => {
            if(!user?.id || !user?.token) return;

            try {
                const response = await axios.get(`http://localhost:8080/progressLesson/lessonsCompletedByUser/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                console.log(response.data);
                const leccionesCompletadas = response.data;
                const total = Array.isArray(response.data) ? response.data.length : 0;
                setLessonsComplete(leccionesCompletadas);
                setTotalLessonsComplete(total);
            } catch (error) {
                console.error("Error al obtener temas: ", error);
                setError("Error al cargar los temas del curso");
            }finally{
                setLoading(false);
            }
        }

        fetchLessonsCompleted();
    },[user])

    //Cargar temas completados del backend
    useEffect(() => {
        const fetchTopicsCompleted = async () => {
            if(!user?.id || !user?.token) return;

            try {
                const response = await axios.get(`http://localhost:8080/progressTopic/byUserAndLanguage/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Accept-Language': currentLanguage
                    }
                });
                console.log(response.data);
                const temasCompletados = response.data;
                const total = Array.isArray(response.data) ? response.data.length : 0;
                setTopicsComplete(temasCompletados);
                setTotalTopicsComplete(total);
            } catch (error) {
                console.error("Error al obtener temas: ", error);
                setError("Error al cargar los temas del curso");
            }finally{
                setLoading(false);
            }
        }

        fetchTopicsCompleted();
    },[user])

    //Cargar lecciones cuando se selecciona un tema
    useEffect(() => {
        const fetchLessonsProgress = async () => {

            if(!currentTopic || !user?.id || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/progressLesson/byUserAndLanguage/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Accept-Language': currentLanguage
                    }
                });

                const allLessons = response.data;
                setLessonsProgress(allLessons);


                //Filtrar lecciones del tema actual
                const topicLessons = allLessons.filter(lesson => lesson.idTopic === currentTopic.idTopic);
                setCurrentTopicLessons(topicLessons);

                //Restaurar lección actual desde localStorage si existe
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

    //Función para seleccionar una lección
    const selectLesson = (lesson) => {
        setCurrentLesson(lesson);
        localStorage.setItem('leccionActual', JSON.stringify(lesson));
    }

    //Marcar una lección como completada
    const completeLesson = async (userId, lessonId) => {
        if(!user?.id||!user?.token){
            setError('Debe iniciar sessón para guardar progreso');
            return{success: false}
        }
        try {
            const response  = await axios.post(`http://localhost:8080/progressLesson/completedLesson/${userId}/${lessonId}`,
                {}, // cuerpo vacío si no necesitas enviar datos
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            console.log(response.data);
            // Actualizar estado local
            setLessonsProgress(prev => 
                prev.map(lesson => 
                lesson.id === lessonId ? { ...lesson, completed: true } : lesson
                )
            );
             // Actualizar lecciones del tema actual
            setCurrentTopicLessons(prev => 
                prev.map(lesson => 
                lesson.idLesson === lessonId ? { ...lesson, completed: true } : lesson
                )
            );

             // Si la lección actual es la que se completó, actualizarla
            if (currentLesson?.idLesson === lessonId) {
                const updatedLesson = { ...currentLesson, completed: true };
                setCurrentLesson(updatedLesson);
                localStorage.setItem('leccionActual', JSON.stringify(updatedLesson));
            }

            return {success: true, data: response.data}
        } catch (error) {
            console.error("Error al marcar lección como completada: ", error);
            setError('Error al actualizar progreso');
            return {success: false};
        }
    };

    const completeTopic = async(userId, topicId) => {
        if(!user?.id||!user?.token){
            setError('Debe iniciar sessón para guardar progreso');
            return{success: false}
        }
        try {
            const response  = await axios.post(`http://localhost:8080/progressTopic/completedTopic/${userId}/${topicId}`,
                {}, // cuerpo vacío si no necesitas enviar datos
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            console.log(response.data);
            // Actualizar estado local de topicsProgress
        setTopicsProgress(prev => 
            prev.map(topic => 
                topic.idTopic === topicId ? { ...topic, completed: true } : topic
            )
        );

        // Actualizar temas del curso actual
        setCurrentCourseTopics(prev => 
            prev.map(topic => 
                topic.idTopic === topicId ? { ...topic, completed: true } : topic
            )
        );

        // Si el tema actual es el que se completó, actualizarlo
        if (currentTopic?.idTopic === topicId) {
            const updatedTopic = { ...currentTopic, completed: true };
            setCurrentTopic(updatedTopic);
            localStorage.setItem('temaActual', JSON.stringify(updatedTopic));
        }

            return {success: true, data: response.data}
        } catch (error) {
            console.error("Error al marcar lección como completada: ", error);
            setError('Error al actualizar progreso');
            return {success: false};
        }
    };

    //Calcular lecciones completadas
    const leccionesCompletadas = () => {

    };

    // Refrescar datos de progreso
    const refreshProgress = async () => {
        setLoading(true);
        
        try {
        // Refrescar temas
        if (currentCourse?.id && user?.id) {
            const topicsResponse = await axios.get(`http://localhost:8080/progressTopic/byUserAndLanguage/${user.id}`, {
            headers: { 
                Authorization: `Bearer ${user.token}`,
                'Accept-Language': currentLanguage
                }
            });
            
            const allTopics = topicsResponse.data;
            setTopicsProgress(allTopics);
            
            const courseTopics = allTopics.filter(topic => topic.idCourse === currentCourse.id);
            setCurrentCourseTopics(courseTopics);
        }
        
        // Refrescar lecciones
        if (currentTopic?.idTopic && user?.id) {
            const lessonsResponse = await axios.get(`http://localhost:8080/progressLesson/byUserAndLanguage/${user.id}`, {
                headers: 
                { 
                    Authorization: `Bearer ${user.token}`,
                    'Accept-Language': currentLanguage 
                }
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
                completeLesson,
                completeTopic,
                lessonsComplete,
                totalLessonsComplete,
                totalTopicsComplete,
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