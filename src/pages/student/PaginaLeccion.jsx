import ReactPlayer from "react-player";
import Header from "../../components/Header";
import ReproductorVideo from "../../components/ReproductorVideo";
import { useRef, useState } from 'react';
import PdfViewer from "../../components/VisualizadorPDF";
import BarraLateralHome from "../../components/BarraLateralHome";
import VideoJS from "../../components/VideoJS";
import videojs from "video.js";

const PaginaLeccion = () =>{

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: '/public/videos/Brooklyn Nine-Nine _ Every Cold Open (Season 1 Part 1)(720P_HD).mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('Player will dispose');
        });
    }



    return(
        <>
            <div className="dashboard">
                <BarraLateralHome/>
                <div className="main-content">
                    <h2>Video de tal y cual cosa</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1>Reproductor Video.js en React</h1>
                        <VideoJS 
                            options={videoJsOptions}
                            onReady={(player) => {
                            console.log('Player está listo', player);
                            }}
                        />
                        </div>
                    <h2>Descripcion de tal y cual cosa</h2>
                    <h2>Vamos a ver si carga el PDF</h2>
                    <embed src="https://downloads.telmex.com/pdf/Info-Redes%20Sociales.pdf" width="90%" height="600px" type="application/pdf" />
                </div>
            </div>
        </>
    );
};

export default PaginaLeccion;

    // const leccionActual = localStorage.getItem('leccionActual');
    // const leccionParseada = JSON.parse(leccionActual);
    // const tituloLeccion = leccionParseada.title
    // const contentUrl = leccionParseada.contentUrl;
    ///>

    //<PdfViewer pdfUrl={'/public/De-la-brevedad-de-la-vida.pdf'} />
    //