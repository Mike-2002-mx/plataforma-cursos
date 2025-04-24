
import { RiVideoFill } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './detallesLeccion.css';


const DetallesLeccion = ({nombreLeccion, isComplete, onAction}) =>{
    return(
        <>
            <div className="contenedor__leccion">
                <RiVideoFill size={60}/>
                <p>{nombreLeccion}</p>
                {isComplete ? (
                    <IoCheckmarkCircleSharp size={60} />
                ): (
                    <button onClick={onAction}>Comenzar</button>
                )}
            </div>
        </>
    );
}; 

export default DetallesLeccion;