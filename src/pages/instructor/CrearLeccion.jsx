import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useInstructorContent } from '../../context/InstructorContentContext';

const CrearLeccion = () =>{

    const preset_name = "abecedario";
    const cloud_name = "do0g84jlj"

    const [title, setTitle] = useState('');
    const [titleNahuatl, setTitleNahuatl] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionNahuatl, setDescriptionNahuatl] = useState('');
    const [typeContent, setTypeContent] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [contentUrl, setContentUrl] = useState('');
    const {temaActual} = useInstructorContent();
    const [file, setFile] = useState(null);
    

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {isAuthenticated, user} = useAuth();
    //const {currentTopic}
    const navigate= useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Usuario no autenticado, redirigiendo a login");
                navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    //Manejar la carga del archivo----
    const handleFileUpload = async () => {

        if (!file) {
            setError('Selecciona un archivo primero');
            return null;
        }

        setUploading(true);
        try {
            if (!validateFileType(file, typeContent)) {
                setError('Tipo de archivo no válido para el contenido seleccionado');
                return null;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset_name);

            const endpoint = typeContent.toLowerCase() === 'pdf' 
            ? `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`
            : `https://api.cloudinary.com/v1_1/${cloud_name}/upload`;

            // Subir archivo
            const response = await axios.post(endpoint, formData, {
                onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
                console.log(`Progreso de carga: ${percentCompleted}%`);
                },
            });

            return response.data.secure_url;
        } catch (error) {
            console.error('Error subiendo archivo:', error);
            setError('Error al subir el archivo');
            return null;
        }finally{
            setUploading(false);
        }
    };

    // Agregar función para validar el tipo de archivo
    const validateFileType = (file, typeContent) => {
        const typeMap = {
        IMAGEN: ['image/jpeg', 'image/png'],
        VIDEO: ['video/mp4', 'video/quicktime'],
        AUDIO: ['audio/mpeg', 'audio/wav'],
        PDF: ['application/pdf']
        };
        
        return typeMap[typeContent]?.includes(file.type);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!title || !description || !typeContent){
            alert('Por favor completa los campos requeridos');
            return;
        }

        if(!file){
            setError("Debes seleccionar un archivo");
            return;
        }

        try {
            setLoading(true);
            
            //1. Subir archivo a cloudinary
            const url = await handleFileUpload();
            if(!url) return;

            //2. Asignar los valores a lesson para enviar al back
            const lessonData = {
                title: title,
                description: description,
                typeContent: typeContent,
                contentUrl: url,
                idTopic: temaActual.id//
            };

            const lessonResponse = await axios.post(
                'http://localhost:8080/lessons',
                lessonData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
            const newLesson = lessonResponse.data;
            console.log(newLesson);
            if (newLesson.id) {
                const translationData = {
                    languageCode: 'nah', 
                    translatedTitle: titleNahuatl,
                    translatedDescription: descriptionNahuatl,
                    idLesson: newLesson.id
                };

                const lessonTranslation = await axios.post('http://localhost:8080/lessonTranslations', translationData, 
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                    }
                });
                console.log(lessonTranslation.data)

                setTitle('');
                setTitleNahuatl('');
                setDescription('');
                setDescriptionNahuatl('');
                setTypeContent('');
                setFile(null);
                
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
            <label htmlFor="title">Título de la lección</label>
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
            <label htmlFor="description">Descripción de la lección</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            
            <div className="form-group">
            <label htmlFor="descriptionNahuatl">Descripción en Náhuatl</label>
            <textarea
                id="descriptionNahuatl"
                value={descriptionNahuatl}
                onChange={(e) => setDescriptionNahuatl(e.target.value)}
            />
            </div>

            <select
                    name="typeContent"
                    value={typeContent}
                    onChange={(e) => setTypeContent(e.target.value)}
                    className="seleccion__contentType"
                    required
                >
                    <option value="">Selecciona el tipo de contenido</option>
                    <option value="PDF">PDF</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="AUDIO">AUDIO</option>
                    <option value="IMAGEN">IMAGEN</option>
            </select> 
            
            <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <input
                type="file"
                id="content"
                accept={
                    typeContent === 'IMAGEN' ? 'image/*' :
                    typeContent === 'VIDEO' ? 'video/*' :
                    typeContent === 'AUDIO' ? 'audio/*' :
                    typeContent === 'PDF' ? 'application/pdf' : '*'
                }
                onChange={(e)=>setFile(e.target.files[0])}
            />
            {file && (
            <div className="file-preview">
                    <small>Archivo seleccionado: {file.name}</small>
                </div>
                )}
            </div>
    
            <button 
                type="submit" 
                className="submit-button"
                disabled={loading || uploading}
            >
                {loading || uploading ? (
                <span>Procesando...</span>
                ) : (
                'Crear Lección'
                )}
            </button>
            {uploading && (
                <div>
                    <progress value={uploadProgress} max="100" />
                    <span>{uploadProgress}%</span>
                </div>
            )}
        </form>
        );
};

export default CrearLeccion;