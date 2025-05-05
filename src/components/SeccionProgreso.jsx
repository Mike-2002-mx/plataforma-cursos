
import { useTranslation } from 'react-i18next';
import './seccionProgreso.css';

const SeccionProgreso = ({temasCompletados, leccionesCompletadas, listaActividadesCompletadas}) =>{

    const {t} = useTranslation();

    return(
        <>
    
        <div className="progress-section">
            <h2>{t('seccionProgreso.my_progress')}</h2>
                    <div className="progress-stats">
                        <div className="stat-card">
                            <div className="stat-value">{temasCompletados}</div>
                            <div className="stat-label">{t('seccionProgreso.topicCompletes')}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{leccionesCompletadas}</div>
                            <div className="stat-label">{t('seccionProgreso.lessonsCompletes')}</div>
                        </div>
                    </div>
                    <div className="progress-list">
                        <div className="progress-list">
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--gray-dark)' }}>
                            {t('seccionProgreso.lastActivitiesComplete')}
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