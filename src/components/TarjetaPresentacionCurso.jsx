import { useState } from "react";
import './tarjetaPresentacionCurso.css';

const TarjetaPresentacionCurso = ({imagenCurso, nombreCurso, descripcionCurso, nombreAutor, cantidadTemas}) => {

    return (
        <>
            <div className="tarjeta__presentacion__curso">
                <img src={imagenCurso} alt="portada del curso" />
                <div className="datos__curso">
                    <p>{nombreCurso}</p>    
                    <p>{descripcionCurso}</p>
                    <p>Creado por: {nombreAutor}</p>
                    <p>{cantidadTemas} Temas</p>
                </div>
            </div>
        </>
    )
};

export default TarjetaPresentacionCurso;