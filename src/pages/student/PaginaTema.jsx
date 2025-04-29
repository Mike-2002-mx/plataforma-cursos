import { useState } from "react";
import Header from "../../components/Header";
import DetallesLeccion from "../../components/DetallesLeccion";
import BarraLateralHome from "../../components/BarraLateralHome";
import './paginaTema.css';
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PaginaTema = () => {

    const [progresoLecciones, setProgresoLecciones] = useState([]);
    const temaActual = JSON.parse(localStorage.getItem('temaActual'));
    const idTemaActual = temaActual.idTopic;
    const token = localStorage.getItem('token');
    const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos'));
    const idUsuario = localStorage.getItem('id');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerLecciones = async () =>{
            if(token){
                try {
                    const response = await axios.get(`http://localhost:8080/progressLesson/byUser/${idUsuario}`, {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProgresoLecciones(response.data);

                } catch (error) {
                    console.error('Error al obtener temas', error)
                }
            }
        }
        obtenerLecciones();
    }, []);

    const leccionesTema = progresoLecciones.filter(progresoLeccion => progresoLeccion.idTopic === idTemaActual);

    const verLeccion = (leccion) =>{
        localStorage.setItem('leccionActual', JSON.stringify(leccion));
        navigate("/leccion");
    };

    return(
        <>
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={cursosInscritos}/>
                <div className="main-content">
                    <div className="lesson-header">
                        <h1>Tema: {temaActual.titleTopic}</h1>
                        <h2>{temaActual.descriptionTopic}</h2>
                        <div className="progress-container">
                            <div className="progress-bar"></div>
                        </div>
                        <p className="progress-text">60% completado</p>
                    </div>
                    <div className="lesson-content">
                        <h2>Contenido de la lección</h2>
                        {leccionesTema.map(leccion => (
                            <DetallesLeccion 
                                key={leccion.id}
                                nombreLeccion={leccion.titleLesson}
                                isComplete={false}
                                isVideo={true}
                                onAction={() => verLeccion(leccion)}
                            /> 
                        ))}
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