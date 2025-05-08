import { useNavigate } from "react-router-dom";


const DashboardTema =() =>{
    const navigate = useNavigate();

    const navigateCrearLeccion=()=>{
        navigate('/crear-leccion')
    }

    return(
        <> 
            <video autoPlay controls src="https://res.cloudinary.com/do0g84jlj/video/upload/v1746720641/pkosnqikdgyzk9qlq3s5.mp4"></video>
            <button onClick={navigateCrearLeccion}>
                Agregar lección
            </button>
        </>
    );
};

export default DashboardTema;