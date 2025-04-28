import { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SeccionProgreso from "../../components/SeccionProgreso";
import BarraLateralHome from "../../components/BarraLateralHome";
import TarjetaCursoHome from "../../components/TarjetaCursoHome";
import axios from "axios";
import './home.css';

const Home =  () =>{
    const [cursos, setCursos] = useState([]);
    const [cursosInscritosId, setcursosInscritosId] = useState([]);
    const [username, setUserName] = useState('');
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('id');
    const navigate = useNavigate();

    console.log(token);
    console.log(idUsuario);

    useEffect(() =>{
        setUserName(localStorage.getItem('username'));
    },[]);

    useEffect(() =>{
        const obtenerCursos = async () =>{ 
            if(token){
                try {
                    const response = await axios.get('http://localhost:8080/courses/allCourses', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCursos(response.data);
                } catch (error) {
                    console.error('Error al obtener cursos:', error.response?.data || error.message);
                    throw error;
                }
            }
        };

        obtenerCursos();
    }, []);

    useEffect(() =>{
        const obtenerIdInscritos = async () =>{
            console.log("Hello")
            if(token){
                try {
                    const response = await axios.get('http://localhost:8080/enrollments/student/user', {
                        params: { userId: idUsuario },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const cursosId = response.data.map(e => e.idCourse);
                    setcursosInscritosId(cursosId);
                } catch (error) {
                    console.error('Error al obtener inscripciones:', error);
                }
            }
        }
        obtenerIdInscritos();
    }, []);
    
    const cursosInscritos = cursos.filter(curso => cursosInscritosId.includes(curso.id));
    const cursosDisponibles = cursos.filter(curso => !cursosInscritosId.includes(curso.id));

    console.log('Cursos inscritos: ', cursosInscritos);
    console.log('Cursos disponibles: ', cursosDisponibles)

    const persistirCurso = (curso) =>{
        localStorage.setItem('cursoActual', JSON.stringify(curso));
        navigate("/curso");
    }

    const realizarInscripcion = async (idUsuario, idCurso, curso) =>{
        try {
            const response = await axios.post(
                'http://localhost:8080/enrollments',
                { idUser: idUsuario, idCourse: idCurso },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.setItem('cursoActual', JSON.stringify(curso));
            console.log(response.data)
            navigate("/curso");
        } catch (error) {
            console.log('Error al obtener inscripciones: ', error);
        }
    }

    const recentActivities = [
        { id: 1, title: 'Cómo organizar mi bandeja de entrada' },
        { id: 2, title: 'Configuración de filtros avanzados' },
        { id: 3, title: 'Uso de etiquetas y categorías' }
    ];

    return (
        <>
            <div className="dashboard">
                <BarraLateralHome inicialNombre={'I'} nombreUsuario={username} rol={'Estudiante'} />
            
                <div className="main-content">
                    <div className="welcome-section">
                        <h1>Bienvenida, {username}</h1>
                        <p className="subtitle">Continúa tu aprendizaje donde lo dejaste</p>
                    </div>
                    
                    <h2>Mis cursos en progreso</h2>
                    <div className="courses-grid">
                        {cursosInscritos?.map(curso =>(
                            <TarjetaCursoHome
                                key={curso.id}
                                nombreCurso={curso.title}
                                onAction={() => persistirCurso(curso)}
                                isInscrito={true}
                            />
                        ))
                        }
                    </div>

                    <SeccionProgreso temasCompletados={10} listaActividadesCompletadas={recentActivities} leccionesCompletadas={10}/>
                    <h2>Cursos disponibles</h2>
                    <div className="courses-grid">
                        {cursosDisponibles?.map(curso => (
                            <TarjetaCursoHome
                                key={curso.id} 
                                nombreCurso={curso.title}
                                isInscrito={false}
                                imagenPortada={curso.imageUrl}
                                onAction={() => realizarInscripcion(idUsuario, curso.id, curso)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;