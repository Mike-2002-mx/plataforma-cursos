
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
                            <div className="stat-valueHome">{temasCompletados}</div>
                            <div className="stat-labelHome">{t('seccionProgreso.topicCompletes')}</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-valueHome">{leccionesCompletadas}</div>
                            <div className="stat-labelHome">{t('seccionProgreso.lessonsCompletes')}</div>
                        </div>
                    </div>
                        <div className="progress-listHome">
                        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-dark)' }}>
                            {t('seccionProgreso.lastActivitiesComplete')}
                        </h3>
                        {listaActividadesCompletadas.map((activity) => (
                        <div key={activity.id} className="progress-itemHome">
                            <span className="material-icons">check_circle</span>
                            <div className="progress-textHome">{activity.titleLesson}</div>
                        </div>
                        ))}
                </div>
        </div>
    </>
    )
    
}

export default SeccionProgreso;