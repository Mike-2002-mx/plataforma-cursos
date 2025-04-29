import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

//Crear contexto
const CoursesContext = createContext();

//Proveedor del contexto
export const CoursesProvider = ({children}) =>{

    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {user, isAuthenticated } = useAuth();

    //Obtener todos los cursos
    const fetchAllCourses = async () => {
        if(!isAuthenticated || !user?.token) return;

        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/courses/allCourses', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setAllCourses(response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener cursos:', error.response?.data || error.message);
            setError('Error al cargar los cursos');
            return [];
        } finally{
            setLoading(false);
        }
    };

    //Obtener IDs de cursos inscritos
    const fetchEnrolledCoursesIds = async () => {
        if (!isAuthenticated || !user?.id || !user?.token) return [];

        try {
            const response = await axios.get('http://localhost:8080/enrollments/student/user', {
                params: { userId: user.id },
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            return response.data.map(enrollment => enrollment.idCourse);
        } catch (error) {
            console.error('Error al obtener inscripciones:', error);
            return [];
        }
    };

    //Cargar todos los datos cuando el usuario está autenticado
    useEffect(() => {
        const loadCoursesData  = async () => {
            if(!isAuthenticated){
                setLoading(false);
                return;
            }

            try {
                const courses = await fetchAllCourses();
                const enrolledIds = await fetchEnrolledCoursesIds();

                  // Filtrar cursos inscritos y disponibles
                const enrolled = courses.filter(course => enrolledIds.includes(course.id));
                const available = courses.filter(course => !enrolledIds.includes(course.id));

                setEnrolledCourses(enrolled);
                setAvailableCourses(available);

                //Guardar cursos inscritos en localStorage para persistencia
                localStorage.setItem('cursosInscritos', JSON.stringify(enrolled));

                //Cargar curso actual en localStorage para persistencia
                const savedCurrentCourse = localStorage.getItem('cursoActual');
                if (savedCurrentCourse) {
                    try {
                        setCurrentCourse(JSON.parse(savedCurrentCourse));
                    } catch (e) {
                        console.error('Error al parsear curso actual:', e);
                    }
                }
            } catch (error) {
                setError("Error al cargar los datos de cursos")
            }finally {
                setLoading(false);
            }
        };
        loadCoursesData();
    }, [isAuthenticated, user]);

        // Función para inscribirse a un curso
    const enrollInCourse = async (courseId, course) => {
        if (!isAuthenticated || !user?.id || !user?.token) {
        setError('Debe iniciar sesión para inscribirse');
        return { success: false, message: 'No autenticado' };
        }

        try {
        const response = await axios.post(
            'http://localhost:8080/enrollments',
            { idUser: user.id, idCourse: courseId },
            {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
            }
        );
        
        // Actualizar estado del contexto
        setCurrentCourse(course);
        setEnrolledCourses(prev => [...prev, course]);
        setAvailableCourses(prev => prev.filter(c => c.id !== courseId));
        
        // Actualizar localStorage
        localStorage.setItem('cursoActual', JSON.stringify(course));
        localStorage.setItem('cursosInscritos', JSON.stringify([...enrolledCourses, course]));
        
        return { success: true, data: response.data };
        } catch (error) {
        console.error('Error al inscribirse en el curso:', error);
        setError('Error al realizar la inscripción');
        return { success: false, message: error.response?.data?.message || 'Error de inscripción' };
        }
    };

    // Función para seleccionar un curso como actual
    const selectCourse = (course) => {
        setCurrentCourse(course);
        localStorage.setItem('cursoActual', JSON.stringify(course));
    };

    // Refrescar datos de cursos
    const refreshCourses = () => {
        const loadCoursesData = async () => {
        setLoading(true);
        try {
            const courses = await fetchAllCourses();
            const enrolledIds = await fetchEnrolledCoursesIds();
            
            const enrolled = courses.filter(course => enrolledIds.includes(course.id));
            const available = courses.filter(course => !enrolledIds.includes(course.id));
            
            setEnrolledCourses(enrolled);
            setAvailableCourses(available);
            localStorage.setItem('cursosInscritos', JSON.stringify(enrolled));
        } catch (err) {
            setError('Error al refrescar los datos de cursos');
        } finally {
            setLoading(false);
        }
    };

    loadCoursesData();
    };

    return (
        <CoursesContext.Provider
            value={{
            allCourses,
            enrolledCourses,
            availableCourses,
            currentCourse,
            loading,
            error,
            enrollInCourse,
            selectCourse,
            refreshCourses
            }}
        >
            {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = () => {
    const context = useContext(CoursesContext);
    if (!context) {
        throw new Error('useCourses debe ser usado dentro de un CoursesProvider');
    }
    return context;
};
