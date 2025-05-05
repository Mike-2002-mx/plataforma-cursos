import axios from 'axios';
import './crearCurso.css';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

    //Verificar autenticación
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
            // onUploadSuccess(mediaUrl);
        } catch (error) {
            console.error("Upload failed", error);
        }finally {
            setLoading(false);
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!title || !description || !image){
            alert('Por favor completa los campos requeridos');
            return;
        }

        try {
            setLoading(true);
        
            // 1. Crear curso principal (Endpoint1)
            const courseData = {
                title: title,
                imageUrl: image,
                description: description, // Asumiendo que es opcional según DTO
                idInstructor: user.id // Debes obtener este ID del estado o contexto
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

            // 2. Crear traducción (Endpoint2) solo si el primer request fue exitoso
            if (newCourse.id) {
                const translationData = {
                    languageCode: 'nah', // Código para náhuatl
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

                // Agregar después de éxito:
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
        );
};

export default CrearCurso;