import { useState } from "react";
import Header from "../../components/Header";
import DetallesLeccion from "../../components/DetallesLeccion";
import BarraLateralHome from "../../components/BarraLateralHome";
import './paginaTema.css';
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PaginaTema = () => {

    const [lecciones, setLecciones] = useState([]);
    const tema = localStorage.getItem('temaActual');
    const token = localStorage.getItem('token');
    const temaParseado = JSON.parse(tema);
    const temaTitle = temaParseado.title;
    const temaDescription = temaParseado.description;
    const idTema = temaParseado.id;
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerLecciones = async () =>{
            if(token && idTema){
                try {
                    const response = await axios.get(`http://localhost:8080/lessons/byTopic/${idTema}`, {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setLecciones(response.data);
                } catch (error) {
                    console.error('Error al obtener temas', error)
                }
            }
        }
        obtenerLecciones();
    }, []);

    const verLeccion = (leccion) =>{
        localStorage.setItem('leccionActual', JSON.stringify(leccion));
        navigate("/leccion");
    };

    return(
        <>
            <div className="dashboard">
                <BarraLateralHome/>
                <div className="main-content">
                    <div className="lesson-header">
                        <h1>Tema: {temaTitle}</h1>
                        <h2><h2>{temaDescription}</h2></h2>
                        <div className="progress-container">
                            <div className="progress-bar"></div>
                        </div>
                        <p className="progress-text">60% completado</p>
                    </div>
                    <div className="lesson-content">
                        <h2>Contenido de la lección</h2>
                        {lecciones.map(leccion => (
                            <DetallesLeccion 
                                key={leccion.id}
                                nombreLeccion={leccion.title}
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