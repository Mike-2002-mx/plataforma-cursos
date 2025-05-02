import { useEffect, useRef, useState } from 'react';
import PdfViewer from "../../components/VisualizadorPDF";
import BarraLateralHome from "../../components/BarraLateralHome";
import VideoJS from "../../components/VideoJS";
import videojs from "video.js";
import { useCourseContent } from '../../context/CourseContentContext';
import { useCourses } from '../../context/CoursesContext';
import './paginaLeccion.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PaginaLeccion = () =>{

    const [progressLogged, setProgressLogged] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const {
        currentLesson,
        currentTopic,
        completeLesson,
        loading, 
    } = useCourseContent();

    // Verificar autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    //Verficiar existencia de lección
    useEffect(() => {
        if(!currentLesson && !loading){
            console.log("No hay lección seleccionada, redirigiendo a curso");
            navigate('/tema');
        }
    },[currentLesson, loading, navigate]);

    console.log("Detalles de la lección actual", currentLesson);

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: '/public/videos/Cómo CREAR un CORREO electrónico de GMAIL 2025.mp4', 
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

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('Player will dispose');
        });

        // player.on('timeupdate', () => {
        //     try {
        //         if(!player.paused()){
        //             const currentTime = player.currentTime();
        //             const duration = player.duration();

        //             if(duration > 0){
        //                 const porcentaje = (currentTime/ duration)*100;

        //                 if(porcentaje >5 && !currentLesson.completed && !progressLogged){
        //                     progressLogged = true;
        //                     Promise.resolve().then(() => {
        //                         completeLesson(user.id, currentLesson.idLesson).catch(err => console.error("Error al completar lección", err));
        //                     });
        //                 }
        //             }
        //         }

        //     } catch (error) {
        //         console.error('Error en timeupdate: ', error);
        //     }
        // });

        player.on('ended', () => {
            console.log("Video visto completamente");
            if(!currentLesson.completed){
                Promise.resolve().then(() => {
                    completeLesson(user.id, currentLesson.idLesson).catch(err => console.error("Error al completar la lección", err));
                })
            }
        });
    }

    return(
        <>
            <div className="dashboard">
                <BarraLateralHome/>
                <div className="main-content">
                    <div className="lesson-header">
                        <h1>Tema: {currentTopic.titleTopic} </h1>
                    </div>
                    <div className="lesson-content">
                    <h2>Titulo lección: {currentLesson.titleLesson}</h2>
                        {/* <div className="video-container">
                            
                        </div> */}
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <VideoJS 
                                options={videoJsOptions}
                                onReady={handlePlayerReady}
                            />
                        </div>
                        <div className="lesson-description">
                            Description: {currentLesson.descriptionLesson}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaginaLeccion;

//                    <embed src="https://downloads.telmex.com/pdf/Info-Redes%20Sociales.pdf" width="90%" height="600px" type="application/pdf" />
/**
 * <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <VideoJS 
                                    options={videoJsOptions}
                                    onReady={(player) => {
                                    console.log('Player está listo', player);
                                    }}
                                />
                            </div>
 */