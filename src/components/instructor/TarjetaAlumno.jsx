import './tarjetaAlumno.css';

const TarjetaAlumno = ({nombreAlumno}) =>{

    return(
        <>
        <div className="students-grid">
            <div className="student-card">
                <div className="student-avatar">H</div>
                    <h3 className="student-name">{nombreAlumno}</h3>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                    <p className="progress-text">75% completado</p>
            </div>
        </div>
    </>
    )
    
}

export default TarjetaAlumno;