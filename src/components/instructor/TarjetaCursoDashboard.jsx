import { useInstructorCourses } from '../../context/InstructorCoursesContext';
import './tarjetaCursoDashboard.css';


const TarjetaCursoDashboard = ({imagenPortada, cursoTitulo, totalAlumnos, totalTemas}) =>{
    const {
        instructorCourses
    } = useInstructorCourses();

    return(
        <>
            <div className="card card-2">
                <img src={imagenPortada} alt="Curso" className="thumb" />
                <div className="info">
                    <h4>{cursoTitulo}</h4>
                    <p>👥 {totalAlumnos} alumnos | 📚 {totalTemas} temas</p>
                    <button className="btn-review">Revisar</button>
                </div>
            </div>
        </>
    )
};

export default TarjetaCursoDashboard;