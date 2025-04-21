import { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import TarjetaCurso from "../../components/TarjetaCurso";
import TarjetaAvance from "../../components/TarjetaAvance";
import axios from "axios";
import './home.css';

const Home =  () =>{
    const [cursos, setCursos] = useState([]);
    const [cursosInscritosId, setcursosInscritosId] = useState([]);
    const token = localStorage.getItem('token');
    const idUsuario = localStorage.getItem('id');

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
                    console.log(cursosId);
                } catch (error) {
                    console.error('Error al obtener inscripciones:', error);
                }
            }
        }
        obtenerIdInscritos();
    }, []);
    
    const cursosInscritos = cursos.filter(curso => cursosInscritosId.includes(curso.id));
    const cursosDisponibles = cursos.filter(curso => !cursosInscritosId.includes(curso.id));

    return (
        <>
            <Header/>
            <h2>Mis cursos</h2>
            <div className="contenedor__cursos__inscritos">
                {cursosInscritos.map(curso => (
                    <TarjetaCurso
                        key={curso.id}
                        isInscrito={true}
                        portada={curso.imageUrl}
                        nombreCurso={curso.title}
                    />
                ))}
            </div>
            <h2>Cursos disponibles</h2>
            <div className="contenedor__cursos__disponibles">
                {cursosDisponibles.map(curso => (
                    <TarjetaCurso
                        key={curso.id}
                        isInscrito={false}
                        portada={curso.imageUrl}
                        nombreCurso={curso.title}
                    />
                ))}
            </div>
            <TarjetaAvance/>
        </>
    );

};

export default Home;