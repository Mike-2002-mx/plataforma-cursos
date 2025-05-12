import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './detallesTema.css';

const DetallesTema = ({tituloTema, totalLecciones, isComplete, onAction}) =>{
    return(
        <>
            <div onClick={onAction} className="contenedor__tema">
                <p>{tituloTema}</p>
                <p>{totalLecciones} lecciones</p>
                {isComplete ? (
                    <button className="btn__detalles" onClick={onAction}>Revisar</button>
                ):(
                    <button className="btn__detalles" onClick={onAction}>Comenzar</button>
                )
                }
                {isComplete ? (
                    <IoCheckmarkCircleSharp size={40}/>
                ):(
                    ''
                )
                }
            </div>
        </>
    );
};

export default DetallesTema;