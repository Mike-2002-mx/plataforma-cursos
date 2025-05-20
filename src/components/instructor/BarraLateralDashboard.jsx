import { useEffect, useState } from "react";
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './barraLateralDashboard.css';

const BarraLateralDashboard = ({}) => {
    const navigate = useNavigate();
    const {isAuthenticated, user, logout} = useAuth();
    const {
        instructorCourses,
        selectCourse
    } = useInstructorCourses();
    
    //Manejar la selección del curso inscrito
    const handleSelectCourse = (curso) => {
        console.log("Curso seleccionado: ", curso);
        selectCourse(curso);
        navigate('/vista-curso');
    };

    const navigateHome=() =>{
        navigate('/')
    }

    return (
        <>
            <div className="barra-lateral">
                <div className="contenedor-logo">
                    <img src="public/Logo.png" alt="Logo" className="logo"></img>
                    <h1 className="titulo-curso">Momachtia TIC</h1>
                </div>

                <div className="tarjeta-usuario">
                    <div className="avatar">{'M'}</div>
                    <div className="info-usuario">
                        <h4>{user?.username}</h4>
                        <span className="badge">Instructor</span>
                    </div>
                </div>

                <div className="seccion-menu">
                    <h3 className="titulo-seccion">Opciones</h3>
                    <button className="btnDashboard" onClick={navigateHome} >
                        <span className="material-icons icon">home</span>
                        Inicio
                    </button>
                    <button className="btnDashboard" onClick={logout}>
                        <span className="material-icons icon">logout</span>
                        Cerrar sesión
                    </button>
                </div>

                <div className="seccion-menu">
                    <h3 className="titulo-seccion">Mis cursos</h3>
                    {instructorCourses && instructorCourses.map(curso => (
                        <button
                            className="btnDashboard"
                            key={curso.id}
                            onClick={() => handleSelectCourse(curso)}>
                            <span className="material-icons icon">book</span>
                            {curso.title}
                        </button>
                    ))}
                </div>

            </div>
        </>
    );
};

export default BarraLateralDashboard;