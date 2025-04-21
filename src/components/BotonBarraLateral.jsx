import './botonBarraLateral.css';
import { MdOutlineTopic } from "react-icons/md";

const BotonBarraLateral = () => {
    return(
        <>
            <div className='boton__lateral'>
                <button className='btn__boton__lateral'>
                    Nombre del curso
                    <MdOutlineTopic  size={60}/>
                </button>
            </div>
        </>
    );
};

export  default BotonBarraLateral;