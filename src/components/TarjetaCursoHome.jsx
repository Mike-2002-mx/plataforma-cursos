import { useTranslation } from 'react-i18next';
import './tarjetaCursoHome.css';

const TarjetaCursoHome = ( {imagenPortada, nombreCurso, isInscrito, instructorName, onAction}) =>{
    const {t} = useTranslation();
    return(
        <>
            <div className="course-cardHome" onClick={onAction}>
                <div className="course-contentHome">
                    <img
                            className='img-portadaCurso'
                            src={imagenPortada} 
                            alt={`Portada de ${nombreCurso}`}
                    />
                    <div>
                        {isInscrito && (
                            <div className='course-progressHome'/>
                        )}
                        <h3 className="course-titleHome">{nombreCurso}</h3>
                        <p className="course-authorHome">{t('tarjetaCursoHome.by')} {instructorName}</p>
                        <button onClick={onAction} className="btn-continue">
                            {isInscrito ? t('tarjetaCursoHome.continue') : t('tarjetaCursoHome.starBtn')}
                            <span className="material-icons">
                                    {isInscrito? 'arrow_forward' : 'play_arrow'}
                            </span>
                        </button> 
                    </div>
                </div>
            </div>
        </>
    )
};

export default TarjetaCursoHome;