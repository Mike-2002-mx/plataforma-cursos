import { useState } from "react";
import Header from "../../components/Header";
import DetallesLeccion from "../../components/DetallesLeccion";
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
            <Header/>
            <h2>Tema: {temaTitle}</h2>
            <h2>{temaDescription}</h2>
            <h2>Lecciones</h2>
            {lecciones.map(leccion => (
                <DetallesLeccion 
                    key={leccion.id}
                    nombreLeccion={leccion.title}
                    isComplete={false}
                    onAction={()=>verLeccion(leccion)}
                />
            ))}
        </>
    )
}

export default PaginaTema;