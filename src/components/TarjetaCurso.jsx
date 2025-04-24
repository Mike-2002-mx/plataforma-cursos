import './tarjetaCurso.css';
import { useNavigate } from 'react-router-dom';

const TarjetaCurso = ({portada, nombreCurso, isInscrito, onAction}) =>{
    return(
        <>
        <div className="tarjeta__curso">
            <img src={portada}/>
            <strong>{nombreCurso}</strong>
            <div className="barra__avance">
                
            </div>
            {isInscrito ? (
                <button className='btn__tarjeta__curso' onClick={onAction}>Continuar</button>
            ):(
                <button className='btn__tarjeta__curso' onClick={onAction} >Comenzar</button>
            )}
        </div>
        </>
    )
};

export default TarjetaCurso;