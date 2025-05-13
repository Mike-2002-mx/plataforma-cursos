
const LeccionDetallesIns = ({tituloLeccion, tipoContenido}) => {

        const getIconData = (tipoContenido) => {
        switch (tipoContenido) {
            case 'PDF':
                return { icon: 'picture_as_pdf', label: 'Infografía' };
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

    const { icon, label } = getIconData(tipoContenido);

    return(
        <>
            <div className="topic-list">
                    <div className="topic-card">
                        <p className="topic-title">{tituloLeccion}</p>
                        {/* <button className="btn-crearTema" onClick={onAction}>
                            Revisar
                        </button> */}
                        <div className="task-meta">
                                    <span className="material-icons">{icon}</span>
                        </div>
                    </div>
            </div>
        </>
    );

};

export default LeccionDetallesIns;