import { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguajeContext";

const InstructorCoursesContext = createContext();

export const InstructorCoursesProvider = ({children}) => {

    const [instructorCourses, setInstructorCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {user, isAuthenticated} = useAuth();
    const {currentLanguage } = useLanguage(); 

    //Obtener cursos del Instructor
    const fetchIstructorCourses = async () => {
        if(!isAuthenticated || !user?.token) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/courses/byInstructorAndLanguaje/${user.id}`, {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                    'Accept-Language': currentLanguage
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error al obtener cursos:', error.response?.data || error.message);
            setError('Error al cargar los cursos');
            return [];
        }finally{
            setLoading(false);
        }
    };

    //Cargar todos los datos cuando el usuario este autenticado
    useEffect(() => {
        const loadCoursesData = async() => {
            if(!isAuthenticated){
                setLoading(false);
                return;
            }

            try {
                const courses = await fetchIstructorCourses();
                setInstructorCourses(courses);
                //Guardar datos de los cusos en localStorage
                localStorage.setItem('cursosInstructor', JSON.stringify(courses));
                //Cargar curso actual en localStorage para persistencia
                const savedCurrentCourse = localStorage.getItem('cursoActual');
                if(savedCurrentCourse){
                    try {
                        setCurrentCourse(JSON.parse(savedCurrentCourse));
                    } catch (error) {
                        console.error("Error al parsear curso actual: ", error);
                    }
                }
            } catch (error) {
                setError("Error al cargar los datos de cursos")
            }finally{
                setLoading(false);
            }
        };
        loadCoursesData();
    },[isAuthenticated, user]);


    //Función para seleccionar un curso como actual 
    const selectCourse = (course) => {
        setCurrentCourse(course);
        localStorage.setItem('cursoActual', JSON.stringify(course));
    };


    return(
        <InstructorCoursesContext.Provider
            value={{
                instructorCourses,
                currentCourse, 
                selectCourse,
                loading, 
                error
            }}
        >
            {children}
        </InstructorCoursesContext.Provider>
    );
};

export const useInstructorCourses = () => {
    const context = useContext(InstructorCoursesContext);
        if (!context) {
            throw new Error('useCourses debe ser usado dentro de un CoursesProvider');
        }
        return context;
};