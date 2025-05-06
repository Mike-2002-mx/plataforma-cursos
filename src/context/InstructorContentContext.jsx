import { createContext, useContext, useState, useEffect, use } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useCourses } from "./CoursesContext";
import { useLanguage } from "./LanguajeContext";
import { useInstructorCourses } from "./InstructorCoursesContext";

//Crear el contexto 
const InstructorContentContext = createContext();

export const InstructorContentProvider = ({children}) =>{
    const [estudiantesInscritos, setEstudiantesInscritos] = useState([]);
    const [totalInscritos, setTotalInscritos] = useState(null);
    const [temasCurso, setTemasCurso] = useState([]);
    const [totalTemas, setTotalTemas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const {currentCourse } = useInstructorCourses();
    const {currentLanguage} = useLanguage();
    const {user} = useAuth();

    //Cargar alumnos inscritos
    useEffect(() => {

        const fetchEnrollmentsStudents = async () =>{
            if(!currentCourse || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/enrollments/course/course?courseId=${currentCourse.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                const allEnrollmentStudents = response.data;
                const totalAlumnosDelCurso = allEnrollmentStudents.length;
                console.log(totalAlumnosDelCurso);
                setTotalInscritos(totalAlumnosDelCurso);
                setEstudiantesInscritos(allEnrollmentStudents);

            } catch (error) {
                console.error("Error al obtener alumnos: ", error);
                setError("Error al cargar los alumnos del curso");
            }finally{
                setLoading(false);
            }
        };
        fetchEnrollmentsStudents();

    },[currentCourse, user])


    //Cargar temas del curso
    useEffect(() => {
        
        const fetchTopicsCourse = async() =>{
            if(!currentCourse || !user?.id || !user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/topics/byCourse/${currentCourse.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Accept-Language': currentLanguage
                    }
                });
                const topicsCourse = response.data;
                const totalTopics = topicsCourse.length;
                setTotalTemas(totalTopics);
                setTemasCurso(topicsCourse);
            } catch (error) {
                console.error("Error al obtener temas: ", error);
                setError("Error al cargar los temas del curso");
            }finally{
                setLoading(false);
            }
        };
        fetchTopicsCourse();
    }, [currentCourse, user]);

    return(
        <InstructorContentContext.Provider
            value={{
                estudiantesInscritos,
                totalInscritos,
                temasCurso,
                totalTemas,
                loading,
                error
            }}
        >
            {children}
        </InstructorContentContext.Provider>
    );
};

export const useInstructorContent = () => {
    const context = useContext(InstructorContentContext);
    if(!context){
        throw new Error('UseInstructorCOntent debe ser usado dentro de un InstructorCOntentProvider');
    }
    return context;
};