import videojs from "video.js";
import 'video.js/dist/video-js.css';
import { useRef, useEffect } from "react";

const VideoJS = (props) => {

    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options, onReady} = props;

    useEffect(() => {
        
        if(!playerRef.current){
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('Player is ready');
                console.log('Player tracks:', player.textTracks());
                onReady && onReady(player);
            });
        }else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

            return () => {
                if (player && !player.isDisposed()) {
                    player.dispose();
                    playerRef.current = null;
            }
        };
    },[playerRef])

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    )
}

export default VideoJS;