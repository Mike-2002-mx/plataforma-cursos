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


const PaginaTema = () => {

    // const [progresoLecciones, setProgresoLecciones] = useState([]);
    // const temaActual = JSON.parse(localStorage.getItem('temaActual'));
    // const idTemaActual = temaActual.idTopic;
    // const token = localStorage.getItem('token');
    // const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos'));
    // const idUsuario = localStorage.getItem('id');
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const obtenerLecciones = async () =>{
    //         if(token){
    //             try {
    //                 const response = await axios.get(`http://localhost:8080/progressLesson/byUser/${idUsuario}`, {
    //                     headers:{
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 });
    //                 setProgresoLecciones(response.data);

    //             } catch (error) {
    //                 console.error('Error al obtener temas', error)
    //             }
    //         }
    //     }
    //     obtenerLecciones();
    // }, []);

    // const leccionesTema = progresoLecciones.filter(progresoLeccion => progresoLeccion.idTopic === idTemaActual);

    // const verLeccion = (leccion) =>{
    //     localStorage.setItem('leccionActual', JSON.stringify(leccion));
    //     navigate("/leccion");
    // };
    
    const navigate = useNavigate();
    const {isAuthenticated } = useAuth();
    const {enrolledCourses} = useCourses();
    const {
        currentTopic,
        currentTopicLessons,
        selectLesson,
        loading,
        error
    } = useCourseContent();

    //Verificar autenticación   
    useEffect(() => {
        
        if(!currentTopic && !loading){
            console.log("No hay tema seleccionado, redirigiendo a curso");
            navigate('/curso');
        }
    },[currentTopic, loading, navigate]);

    //Manejar selección de lección
    const handleSelectLesson = (leccion) => {
        selectLesson(leccion);
        navigate('/leccion');
    }

    if(loading){
        return <div className="loading">Cargando lecciones...</div>;
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
                            <p className="progress-text">60% completado</p>
                        </div>
                    )}
                    
                    <div className="lesson-content">
                        <h2>Contenido de la lección</h2>
                        {currentTopicLessons.length > 0 ? (
                            currentTopicLessons.map(leccion => (
                                <DetallesLeccion 
                                    key={leccion.id}
                                    nombreLeccion={leccion.titleLesson}
                                    isComplete={leccion.completed}
                                    isVideo={leccion.lessonType === 'VIDEO'}
                                    onAction={() => handleSelectLesson(leccion)}
                                /> 
                            ))
                        ) : (
                            <p>Este tema aún no tiene lecciones disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaginaTema;

/*          {lecciones.map(leccion => (
                <DetallesLeccion 
                    key={leccion.id}
                    nombreLeccion={leccion.title}
                    isComplete={false}
                    onAction={()=>verLeccion(leccion)}
                />
            ))}*/