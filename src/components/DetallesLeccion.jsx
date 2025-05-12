
import { RiVideoFill } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './detallesLeccion.css';


const DetallesLeccion = ({nombreLeccion, typeContent, isComplete, onAction}) =>{


    const getIconData = (typeContent) => {
        switch (typeContent) {
            case 'PDF':
                return { icon: 'picture_as_pdf', label: 'PDF' };
            case 'VIDEO':
                return { icon: 'videocam', label: 'Video' };
            case 'IMAGEN':
                return { icon: 'image', label: 'Imagen' };
            case 'AUDIO':
                return { icon: 'audiotrack', label: 'Audio' };
            default:
                return { icon: 'article', label: 'Contenido' }; // fallback
        }
    };

    const { icon, label } = getIconData(typeContent);

    return(
        <>
            <div className="tasks-list">
                    <div className="task-item">
                        {isComplete ? (
                            <div className="task-checkbox checked"></div>
                        ): (
                            <div className="task-checkbox"></div>
                        )}
                        <div className="task-content">
                            <h3 className="task-title">{nombreLeccion}</h3>
                            {/* {isVideo ? (
                                <div className="task-meta">
                                <span className="material-icons">play_circle</span>
                                <span>Video</span>
                                </div>
                            ):(
                                <div className="task-meta">
                                    <span className="material-icons">article</span>
                                    <span>Teoría</span>
                                </div>
                            )} */}
                            <div className="task-meta">
                                    <span className="material-icons">{icon}</span>
                                    <span>{label}</span>
                            </div>
                        </div>
                        {isComplete ? (
                                <button onClick={onAction}  className="btn-lesson">Revisar</button>
                            ):
                            (
                                <button 
                                onClick={onAction} className="btn-lesson">Comenzar</button>
                            )}
                    </div>
            </div>
        </>
    );
}; 

export default DetallesLeccion;

/*<div className="contenedor__leccion">
                <RiVideoFill size={60}/>
                <p>{nombreLeccion}</p>
                {isComplete ? (
                    <IoCheckmarkCircleSharp size={60} />
                ): (
                    <button onClick={onAction}>Comenzar</button>
                )}
            </div>*/