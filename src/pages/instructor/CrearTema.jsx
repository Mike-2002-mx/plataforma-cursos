import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useInstructorCourses } from "../../context/InstructorCoursesContext";
import { useInstructorContent } from "../../context/InstructorContentContext";
import { useState, useEffect } from "react";
import axios from "axios";
import BarraLateralDashboard from "../../components/instructor/BarraLateralDashboard";

const CrearTema = () =>{

    const [title, setTitle] = useState('');
    const [titleNahuatl, setTitleNahuatl] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionNahuatl, setDescriptionNahuatl] = useState('');
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {isAuthenticated, user} = useAuth();
    const navigate= useNavigate();
    const {currentCourse} = useInstructorCourses();
    
    useEffect(() => {
            if (!isAuthenticated) {
                console.log("Usuario no autenticado, redirigiendo a login");
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!title || !description){
            alert('Por favor completa los campos requeridos');
            return;
        }

        try {
            setLoading(true);
        
            const topicData = {
                title: title,
                description: description,
                courseId: currentCourse.id 
            };

            const topicResponse = await axios.post(
                'https://plataformacursos-production.up.railway.app/topics',
                topicData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            const newTopic = topicResponse.data;

            if (newTopic.id) {
                const translationData = {
                    languageCode: 'nah', 
                    translatedTitle: titleNahuatl,
                    translatedDescription: descriptionNahuatl,
                    topicId: newTopic.id
                };

                const topicTranslation = await axios.post('https://plataformacursos-production.up.railway.app/topicTranslations', translationData, 
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                    }
                });
                console.log(topicTranslation.data)

                setTitle('');
                setTitleNahuatl('');
                setDescription('');
                setDescriptionNahuatl('');
                // navigate("vista-curso");

            }

        } catch (error) {
            const errorData = error.response?.data;
            console.error('Error detallado:', {
                status: error.response?.status,
                data: errorData
            });
        }finally {
            setLoading(false);
        }

    };

    const toggleButton = () => {
        setMenuOpen(!menuOpen);
    }
    

    return (
        <div className="dashboard">
            <div className="barra-mobile">
                    <button onClick={toggleButton} className="barra-mobile-button">
                        <span class="material-icons icon-mobile">menu</span>
                    </button>
                    <h1 className="page-title-mobile">Momachtia TIC</h1>
                    <img src="public/Logo.png" alt="Logo" className="logo"/>
            </div>

            <div className= {menuOpen ? 'visible': 'oculto'} >
                    <BarraLateralDashboard/>
            </div>
            
            <div className="main-content">
                <form className="course-form" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="title">Título del tema</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="titleNahuatl">Título en Náhuatl</label>
                <input
                    type="text"
                    id="titleNahuatl"
                    value={titleNahuatl}
                    onChange={(e) => setTitleNahuatl(e.target.value)}
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="description">Descripción del tema</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="descriptionNahuatl">Descripción del tema en Náhuatl</label>
                <textarea
                    id="descriptionNahuatl"
                    value={descriptionNahuatl}
                    onChange={(e) => setDescriptionNahuatl(e.target.value)}
                />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Agregar tema'}
                </button>
            </form>
            </div>
        </div>

        
        );

};

export default CrearTema;