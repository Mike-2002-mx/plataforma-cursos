
const AudioPlayer = ({url}) => {
        return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <AudioPlayer
            src={url}
            onPlay={() => console.log('Reproduciendo')}
            onPause={() => console.log('Pausado')}
            autoPlay={false}
            controls
            layout="horizontal"
            />
        </div>
        );
};

export default AudioPlayer;