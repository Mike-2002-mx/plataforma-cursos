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
        const [progresoTemas, setProgresoTemas] = useState([]);
        const [idCurso, setIdCurso] = useState(null);
        const idUsuario = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos'));
        console.log(cursosInscritos);
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
            const obtenerProgresoTemas = async () =>{
                if(token && idCurso){
                    try {
                        const response = await axios.get(`http://localhost:8080/progressTopic/byUser/${idUsuario}`, {
                            headers:{
                                Authorization: `Bearer ${token}`
                            }
                        });
                        setProgresoTemas(response.data);
                    } catch (error) {
                        console.error('Error al obtener temas', error)
                    }
                }
            }
            obtenerProgresoTemas();
        }, [idCurso, token]);

        //Filtrar para mostrar solo temas del curso
        const temasCurso = progresoTemas.filter(progresoTema => progresoTema.idCourse === idCurso);

        const revisarTema = (tema) =>{
            localStorage.setItem('temaActual', JSON.stringify(tema));
            navigate("/tema")
        }

    return (
        <>
            
            <div className="dashboard">
                <BarraLateralHome cursosInscritos={cursosInscritos}/>

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
                    {temasCurso.map(tema => (
                        <DetallesTema
                            key={tema.idTopic}
                            tituloTema={tema.titleTopic}
                            totalLecciones={tema.totalLessons}
                            isComplete={tema.completed }
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