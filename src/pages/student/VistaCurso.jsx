import { useEffect, useState } from "react";
import Header from "../../components/Header";
import TarjetaPresentacionCurso from "../../components/TarjetaPresentacionCurso";
import axios from "axios";
import './vistaCurso.css';
import DetallesTema from "../../components/DetallesTema";
import { useNavigate } from "react-router-dom";
import BarraLateralHome from "../../components/BarraLateralHome";

const VistaCurso = () => {

        const [cursoActual, setCursoActual] = useState(null);
        const [temas, setTemas] = useState([]);
        const [idCurso, setIdCurso] = useState(null);
        const token = localStorage.getItem('token');
        const navigate = useNavigate();

        useEffect(() => {
            const datosGuardados = localStorage.getItem('cursoActual');
            if(datosGuardados){
                try {
                    const cursoParseado = JSON.parse(datosGuardados);
                    setIdCurso(cursoParseado.id);
                    setCursoActual(cursoParseado);
                } catch (error) {
                    console.error("Error al obtener curso: ", error);
                }
            }
        }, []);

        useEffect(() => {
            const obtenerTemas = async () =>{
                if(token && idCurso){
                    try {
                        const response = await axios.get(`http://localhost:8080/topics/course/${idCurso}`, {
                            headers:{
                                Authorization: `Bearer ${token}`
                            }
                        });
                        setTemas(response.data);
                    } catch (error) {
                        console.error('Error al obtener temas', error)
                    }
                }
            }
            obtenerTemas();
        }, [idCurso, token]);

        const revisarTema = (tema) =>{
            localStorage.setItem('temaActual', JSON.stringify(tema));
            navigate("/tema")
        }

    return (
        <>
            
            <div className="dashboard">
                <BarraLateralHome/>

                <div className="main-content">
                    {cursoActual && (
                    <TarjetaPresentacionCurso
                        imagenCurso={cursoActual.imageUrl}
                        nombreCurso={cursoActual.title}
                        descripcionCurso={cursoActual.description}
                        nombreAutor={cursoActual.instructorName}
                        cantidadTemas={0}
                    />
                    )}
                    <h2>Temas del curso</h2>
                    {temas.map(tema => (
                        <DetallesTema
                            key={tema.id}
                            tituloTema={tema.title}
                            totalLecciones={0}
                            isComplete={true}
                            onAction={() => revisarTema(tema)}
                        />
                    ))
                    }
                </div>
            </div>
        </>
    );
};

export default VistaCurso;