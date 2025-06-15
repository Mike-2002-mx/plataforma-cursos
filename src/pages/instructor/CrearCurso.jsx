import axios from 'axios';
import './crearCurso.css';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BarraLateralDashboard from '../../components/instructor/BarraLateralDashboard';

const CrearCurso = () =>{

    const preset_name = "abecedario";
    const cloud_name = "do0g84jlj"

    const [title, setTitle] = useState('');
    const [titleNahuatl, setTitleNahuatl] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionNahuatl, setDescriptionNahuatl] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isAuthenticated, user} = useAuth();
    const navigate= useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
            if (!isAuthenticated) {
                console.log("Usuario no autenticado, redirigiendo a login");
                navigate('/login');
            }
        }, [isAuthenticated, navigate]);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, 
                data
            );
            const mediaUrl = response.data.secure_url;
            setImage(mediaUrl);
            console.log(mediaUrl);
        } catch (error) {
            console.error("Upload failed", error);
        }finally {
            setLoading(false);
        }
    }

    const toggleButton = () => {
        setMenuOpen(!menuOpen);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!title || !description || !image){
            alert('Por favor completa los campos requeridos');
            return;
        }

        try {
            setLoading(true);
        
            const courseData = {
                title: title,
                imageUrl: image,
                description: description,
                idInstructor: user.id 
            };

            const courseResponse = await axios.post(
                'http://localhost:8080/courses',
                courseData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            const newCourse = courseResponse.data;

            if (newCourse.id) {
                const translationData = {
                    languageCode: 'nah', 
                    translatedTitle: titleNahuatl,
                    translatedDescription: descriptionNahuatl,
                    idCourse: newCourse.id
                };

                const courseTranslation = await axios.post('http://localhost:8080/courseTranslations', translationData, 
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                    }
                });
                console.log(courseTranslation.data)

                setTitle('');
                setTitleNahuatl('');
                setDescription('');
                setDescriptionNahuatl('');
                setImage(null);
            }

        } catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.message || 'Error en el servidor';
            
            console.error('Error detallado:', {
                status: error.response?.status,
                data: errorData
            });
            
            alert(`Error: ${errorMessage}`);
        }finally {
            setLoading(false);
        }

    };

    return (
        <div className='dashboard'>
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
            <div className='main-content'>
                <form className="course-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="title">Título del curso</label>
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
                    <label htmlFor="description">Descripción del curso</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="descriptionNahuatl">Descripción del curso en Náhuatl</label>
                    <textarea
                        id="descriptionNahuatl"
                        value={descriptionNahuatl}
                        onChange={(e) => setDescriptionNahuatl(e.target.value)}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="image">Imagen de portada</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e)=>uploadImage(e)}
                    />
                    {loading ? (
                    <h3>Loading...</h3>
                    ) : (
                    <img src={image} alt="imagen subida"/>
                    )}
                    </div>
            
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear Curso'}
                    </button>
                </form>
            </div>

        </div>


        
        );
};

export default CrearCurso;