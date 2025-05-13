import './temaDetallesIns.css';

const TemaDetallesIns = ({tituloTema, onAction, totalLecciones}) =>{
    
    return(
        <>
            <div className="topic-list">
                <div onClick={onAction} className="topic-card">
                        <p className="topic-title">{tituloTema}</p>
                        <span className="topic-lecciones">{totalLecciones} {totalLecciones === 1 ? 'lección' : 'lecciones'}</span>
                        <button className="btn-crearTema" onClick={onAction}>
                            Revisar
                        </button>
                </div>
            </div>
        </>
    );
};

export default TemaDetallesIns;