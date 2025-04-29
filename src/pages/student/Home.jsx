import { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SeccionProgreso from "../../components/SeccionProgreso";
import BarraLateralHome from "../../components/BarraLateralHome";
import TarjetaCursoHome from "../../components/TarjetaCursoHome";
import { useCourses } from "../../context/CoursesContext";
import axios from "axios";
import './home.css';

const Home =  () =>{
    // const [cursos, setCursos] = useState([]);
    // const [cursosInscritosId, setCursosInscritosId] = useState([]);
    // const [username, setUserName] = useState('');
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    // const navigate = useNavigate();
    // const {user, isAuthenticated} = useAuth();

    // useEffect(() =>{
    //     if(!isAuthenticated){
    //         console.log("Usuario no autenticado, redirigiendo a login")
    //         navigate('/login');
    //     }
    // },[isAuthenticated, navigate]);

    // useEffect(() =>{
    //     const obtenerCursos = async () =>{ 
    //         if (!user || !user.token) {
    //             console.log("No hay token disponible");
    //             return;
    //         }
    //         setLoading(true);
    //         try {
    //             const response = await axios.get('http://localhost:8080/courses/allCourses', {
    //                 headers: {
    //                     Authorization: `Bearer ${user.token}`,
    //                 },
    //             });
    //             setCursos(response.data);
    //         } catch (error) {
    //             console.error('Error al obtener cursos:', error.response?.data || error.message);
    //             setError('Error al cargar los cursos. Intenta de nuevo más tarde.');
    //         }finally{
    //             setLoading(false);
    //         }
    //     };
    //     if (isAuthenticated) {
    //         obtenerCursos();
    //     }
    // }, [isAuthenticated, user]);

    // useEffect(() =>{
    //     const obtenerIdInscritos = async () =>{
    //         if (!user || !user.id || !user.token) {
    //             console.log("Faltan datos del usuario para obtener inscripciones");
    //             return;
    //         }

    //         try {
    //             const response = await axios.get('http://localhost:8080/enrollments/student/user', {
    //                 params: { userId: user.id },
    //                 headers: {
    //                     Authorization: `Bearer ${user.token}`
    //                 }
    //             });
    //             const cursosId = response.data.map(e => e.idCourse);
    //             setCursosInscritosId(cursosId);
    //         } catch (error) {
    //             console.error("Error al obtener inscripciones", error);
    //         }
    //     };
    //     if (isAuthenticated) {
    //         obtenerIdInscritos();
    //     }
    // }, [isAuthenticated, user]);
    
    // const cursosInscritos = cursos.filter(curso => cursosInscritosId.includes(curso.id));
    // const cursosDisponibles = cursos.filter(curso => !cursosInscritosId.includes(curso.id));

    // //Persistir cursos inscritos
    // useEffect(() => {
    //     localStorage.setItem('cursosInscritos', JSON.stringify(cursosInscritos));
    //     console.log("USe efect para persistir cursosInscritos");
    // }, [cursosInscritos]);



    // const persistirCurso = (curso) =>{
    //     localStorage.setItem('cursoActual', JSON.stringify(curso));
    //     navigate("/curso");
    // }

    // const realizarInscripcion = async (idCurso, curso) =>{
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:8080/enrollments',
    //             { idUser: user.id, idCourse: idCurso },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${user.token}`
    //                 }
    //             }
    //         );
    //         localStorage.setItem('cursoActual', JSON.stringify(curso));
    //         console.log(response.data)
    //         navigate("/curso");
    //     } catch (error) {
    //         console.log('Error al obtener inscripciones: ', error);
    //     }
    // }

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
        return <div className="loading">Cargando cursos...</div>;
    }

    return (
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={enrolledCourses} />
            
                <div className="main-content">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="welcome-section">
                        <h1>Bienvenida, {user?.username || user?.name || 'Estudiante'}</h1>
                        <p className="subtitle">Continúa tu aprendizaje donde lo dejaste</p>
                    </div>
                    
                    <h2>Mis cursos en progreso</h2>
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
                            <p>No tienes cursos en progreso. ¡Inscríbete en uno abajo!</p>
                        )}
                    </div>

                    <SeccionProgreso 
                        temasCompletados={10} 
                        listaActividadesCompletadas={recentActivities} 
                        leccionesCompletadas={10}
                    />
                    
                    <h2>Cursos disponibles</h2>
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
                            <p>No hay cursos adicionales disponibles en este momento.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;