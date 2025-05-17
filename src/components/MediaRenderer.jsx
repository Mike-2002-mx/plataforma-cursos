import VideoJS from "./VideoJS";
import { useRef, useState, useEffect } from "react";
import videojs from "video.js";

const MediaRenderer = ({url, typeContent, onContentViewed }) =>{

    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeTime, setActiveTime] = useState(0);
    const [tabActive, setTabActive] = useState(true);
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState(null);
    const timerRef = useRef(null)
    const playerRef = useRef(null);
    const requiredViewTime  = 15;
    const viewedRef = useRef(false)

    //Opciones para VideoJS
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: url, 
                type: 'video/mp4'
            },
        ],
        tracks: [
            {
                kind: 'subtitles',
                src: '/public/subtitulos/Cómo CREAR un CORREO electrónico de GMAIL 2025.vtt',
                srclang: 'nah', 
                label: 'Náhuatl',
                default: true,
                mode: 'showing',
            }
        ],
    };

    //Para reproducir video
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('Player will dispose');
        });

        player.on('loadeddata', () => {
            setLoading(false);
        });

        player.on('error', () => {
            setError("Error al cargar el video");
            setLoading(false);
        });

        player.on('ended', () => {
            onContentViewed();
        });

    }


    // // Contar tiempo activo
    useEffect(() => {
        let timer;

        if (typeContent !== 'VIDEO') {
            timer = setTimeout(() => {
                onContentViewed();
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, []);

    // Verificar si la URL existe
    useEffect(() => {
        setLoading(true);
        setError(null);
        
        if (!url) {
            setError("URL no proporcionada");
            setLoading(false);
            return;
        }else{
            setLoading(false);
        }

        // For debugging - log what we're trying to render
        console.log(`Attempting to render ${typeContent} with URL: ${url}`);
    }, [url, typeContent]);

    const handleMediaLoad = () => {
        setLoading(false);
    };

    const handleMediaError = (errorMessage) => {
        setError(errorMessage || "Error al cargar el contenido");
        setLoading(false);
    };

    const renderMedia = () =>{
        if (loading) return <div className="loading-indicator">Cargando contenido...</div>;
        if (error) return <div className="error-message">{error}</div>;

        // Normalize typeContent to lowercase for comparison
        const mediaType = typeContent?.toLowerCase() || '';
        
        console.log("Rendering media type:", mediaType);


        switch(typeContent.toLowerCase()) {
            case 'video':
            return (
                <>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <VideoJS 
                            options={videoJsOptions}
                            onReady={handlePlayerReady}
                        />
                    </div>
                </>
            );
            
            case 'pdf':
                return(
                    <>
                        <div className="pdf-container">
                            <embed
                            src={url}
                            type="application/pdf"
                            style={{ width: '100%', height: '600px' }}
                            aria-label="Documento PDF"
                            onLoad={handleMediaLoad}
                            onError={() => handleMediaError("Error al cargar el PDF")}
                            />
                            {/* <p className="pdf-fallback">Tu navegador no soporta la visualización de PDF.</p> */}
                        </div>
                    </>
                );
            
            case 'audio':
                return(
                    <>
                        <div className="audio-container">
                            <audio controls 
                            onLoadedData={handleMediaLoad}
                            onError={() => handleMediaError("Error al cargar audio")}
                            style={{ width: '100%' 
                                
                            }}>
                            <source src={url} type={`audio/${url.split('.').pop()}`} />
                            Tu navegador no soporta el elemento de audio.
                            </audio>
                        </div>
                    </>
                );

            case 'imagen':
                return(
                    <>
                        <div className="image-container">
                            <img 
                            src={url} 
                            alt="Contenido multimedia" 
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            onLoad={handleMediaLoad}
                            onError={() => handleMediaError("Error al cargar la imagen")
                            }
                            />
                        </div>
                    </>
                );
            
            default:
                return <div>Tipo de medio no soportado</div>;
        }
    };
    return (
        <div ref={containerRef} className="media-renderer">
            {renderMedia()}
            {/* {!loading && !error && (
                <div className="view-progress">
                    Tiempo visualizado: {activeTime} / {requiredViewTime}s
                </div>
            )} */}
        </div>
    )
};

export default MediaRenderer;