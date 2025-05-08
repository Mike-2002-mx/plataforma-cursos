import { useEffect, useRef, useState } from 'react';
import BarraLateralHome from "../../components/BarraLateralHome";
import VideoJS from "../../components/VideoJS";
import videojs from "video.js";
import { useCourseContent } from '../../context/CourseContentContext';
import './paginaLeccion.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AudioPlayer from '../../components/AudioPlayer';
import MediaRenderer from '../../components/MediaRenderer';

const PaginaLeccion = () =>{

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

    const handleContentViewed = () => {
        console.log("✅ Contenido marcado como visto.");
    };

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
                        <MediaRenderer url={"https://res.cloudinary.com/do0g84jlj/video/upload/v1746720641/pkosnqikdgyzk9qlq3s5.mp4" }  typeContent={'VIDEO'} onContentViewed={handleContentViewed}/>
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

                        {/* <div className="video-container">
                            
                        </div> */}
                        {/* {currentLesson.typeContent === 'VIDEO' ? (
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <VideoJS 
                                options={videoJsOptions}
                                onReady={handlePlayerReady}
                            />
                        </div>
                        ):(
                            <embed src="https://downloads.telmex.com/pdf/Info-Redes%20Sociales.pdf" width="90%" height="600px" type="application/pdf" />
                        )
                    }
                        <div className="lesson-description">
                            Description: {currentLesson.descriptionLesson}
                        </div> */}
                        {/* <AudioPlayer url={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"}/> */}

                                // player.on('ended', () => {
        //     console.log("Video visto completamente");
        //     if(!currentLesson.completed){
        //         Promise.resolve().then(() => {
        //             completeLesson(user.id, currentLesson.idLesson).catch(err => console.error("Error al completar la lección", err));
        //         })
        //     }
        // });

        //'/public/videos/Cómo CREAR un CORREO electrónico de GMAIL 2025.mp4'