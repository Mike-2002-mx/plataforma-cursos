import './temaDetallesIns.css';

const TemaDetallesIns = ({tituloTema, onAction}) =>{
    return(
        <>
            <div className="topic-list">
                <div className="topic-card">
                    <div className="checkbox"></div>
                        <p className="topic-title">{tituloTema}</p>
                        <span className="topic-lecciones">2 lecciones</span>
                        <button className="btn-crearTema" onClick={onAction}>
                            Revisar
                        </button>
                </div>
            </div>
        </>
    );
};

export default TemaDetallesIns;