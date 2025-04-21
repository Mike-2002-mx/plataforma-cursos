import './tarjetaAvance.css'

const TarjetaAvance = () =>{
    return(
        <>
            <div className="tarjeta__avance">
                <div className="avance__circular" style={{ "--progreso": (3/5) * 100 }}>
                    <span>3/5</span>
                </div>
                
                <p>Temas completados</p>
            </div>
        </>
    );
};

export default TarjetaAvance;