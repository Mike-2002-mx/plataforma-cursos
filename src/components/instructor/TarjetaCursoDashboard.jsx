import { useInstructorCourses } from '../../context/InstructorCoursesContext';
import './tarjetaCursoDashboard.css';


const TarjetaCursoDashboard = ({imagenPortada, cursoTitulo, totalAlumnos, totalTemas, totalLecciones, onAction}) =>{
    const {
        instructorCourses
    } = useInstructorCourses();

    return(
        <>
            <div className="card-2" onClick={onAction}>
                <img src={imagenPortada} alt="Curso" className="thumb" />
                <div className="info">
                    <h4>{cursoTitulo}</h4>
                    <p>👥 {totalAlumnos} {totalAlumnos === 1 ? 'alumno': 'Alumnos'} | 📚 {totalTemas} {totalTemas === 1 ? 'tema':'temas'}</p>
                    <p>📚 {totalLecciones} {totalLecciones === 1 ? 'lección' : 'lecciones'}</p>
                    <button className="btn-review" onClick={onAction}>Revisar</button>
                </div>
            </div>
        </>
    )
};

export default TarjetaCursoDashboard;