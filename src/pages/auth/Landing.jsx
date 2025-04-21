import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <h1>Bienvenido a la Plataforma de Cursos</h1>
            <p>Aprende habilidades nuevas con instructores expertos</p>
            
            <div>
                <Link to="/login">
                    <button>Iniciar sesión</button>
                </Link>
                <Link to="/register">
                    <button>Registrarse</button>
                </Link>
            </div>

            <section>
                <h2>Características principales</h2>
                <ul>
                    <li>Cursos en vivo y grabados</li>
                    <li>Certificaciones reconocidas</li>
                    <li>Comunidad activa</li>
                </ul>
            </section>
        </div>
    );
};

export default Landing;