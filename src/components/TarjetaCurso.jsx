import './tarjetaCurso.css';

const TarjetaCurso = ({portada, nombreCurso, isInscrito}) =>{

    return(
        <>
        <div className="tarjeta__curso">
            <img src={portada} width={120} />
            <strong>{nombreCurso}</strong>
            <div className="barra__avance">
                
            </div>
            {isInscrito ? (
                <button className='btn__tarjeta__curso'>Continuar</button>
            ):(
                <button className='btn__tarjeta__curso'>Comenzar</button>
            )}
        </div>
        </>
    )
};

export default TarjetaCurso;