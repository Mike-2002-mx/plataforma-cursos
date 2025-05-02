
import './seccionProgreso.css';

const SeccionProgreso = ({temasCompletados, leccionesCompletadas, listaActividadesCompletadas}) =>{

    return(
        <>
    
        <div className="progress-section">
            <h2>Mi progreso</h2>
                    <div className="progress-stats">
                        <div className="stat-card">
                            <div className="stat-value">{temasCompletados}</div>
                            <div className="stat-label">Temas completados</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{leccionesCompletadas}</div>
                            <div className="stat-label">Lecciones completadas</div>
                        </div>
                    </div>
                    <div className="progress-list">
                        <div className="progress-list">
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--gray-dark)' }}>
                            Últimas actividades
                        </h3>
                        {listaActividadesCompletadas.map((activity) => (
                        <div key={activity.id} className="progress-item">
                            <span className="material-icons">check_circle</span>
                            <div className="progress-text">{activity.titleLesson}</div>
                        </div>
                        ))}
                        </div>
                </div>
        </div>
    </>
    )
    
}

export default SeccionProgreso;