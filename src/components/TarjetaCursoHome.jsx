import { useTranslation } from 'react-i18next';
import './tarjetaCursoHome.css';

const TarjetaCursoHome = ( {imagenPortada,nombreCurso, isInscrito, onAction}) =>{
    const {t} = useTranslation();
    return(
        <>
            <div className="course-card">
                    <div className="course-header">
                        <div>
                            <h3 className="course-title">{nombreCurso}</h3>
                            <p className="course-author">{t('tarjetaCursoHome.by')} Miguel Mateo</p>
                        </div>
                        <button onClick={onAction} className="btn-continue">
                            {isInscrito ? t('tarjetaCursoHome.continue') : t('tarjetaCursoHome.starBtn')}
                            <span className="material-icons">
                            {isInscrito? 'arrow_forward' : 'play_arrow'}
                            </span>
                        </button>
                    </div>
                    
                    <div className="course-progress">
                        {isInscrito ? (
                            <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            background: `conic-gradient(var(--primary) 15%, #E0E0E0 0)`, 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                            }}>
                            <span style={{ 
                                background: 'white', 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '12px', 
                                fontWeight: 'bold'
                            }}>
                                60%
                            </span>
                            </div>
                        ) : (
                            <img
                            className='img-portadaCurso'
                            src={imagenPortada} 
                            alt={`Portada de ${nombreCurso}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                            />
                        )}
                    </div>
            </div>
        </>
    )
};

export default TarjetaCursoHome;