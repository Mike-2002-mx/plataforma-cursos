import { createContext, useContext, useState, useEffect, Children } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const InstructorCoursesContext = createContext();

export const InstructorCoursesProvider = ({children}) => {

    const [instructorCourses, setInstructorCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {user, isAuthenticated} = useAuth();

    //Obtener cursos del Instructor
    const fetchIstructorCourses = async () => {

        if(!isAuthenticated || !user?.token) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/courses/byInstructor/${user.id}`, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
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

            } catch (error) {
                setError("Error al cargar los datos de cursos")
            }finally{
                setLoading(false);
            }
        };
        loadCoursesData();

    },[isAuthenticated, user]);


    return(
        <InstructorCoursesContext.Provider
            value={{
                instructorCourses,
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