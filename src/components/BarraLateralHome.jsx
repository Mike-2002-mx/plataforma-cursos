import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './barraLateralHome.css';
import { useCourses } from '../context/CoursesContext';
import { useTranslation } from 'react-i18next';


const BarraLateralHome = ({}) =>{

    const navigate = useNavigate();
    const {isAuthenticated, user, logout} = useAuth();
    const {
        enrolledCourses,
        loading,
        error,
        selectCourse
    } = useCourses();
    const [avatar, setAvatar] = useState('');

    const {t} = useTranslation();
    //Verificar autenticación
    useEffect(() => {
        if(!isAuthenticated){
            console.log("Usuario no autenticado, redirigiendo a login");
            navigate('/login');
        } else{
            const name = user?.username
            const a = name.charAt(0);
            setAvatar(a);
        }
    },[isAuthenticated, navigate])


    //Manejar la selección del curso inscrito
    const handleSelectCourse = (curso) => {
        selectCourse(curso);
        navigate('/curso');
    };

    const naviteHome = () =>{
        navigate('/home');
    }

    //Mostrar avatar y rol
    // useEffect(() =>{
        
    // }, [])
    

    return (
        <>
            <div className="sidebar">
                <div className="logo-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/5186/5186387.png" alt="Logo" className="logo"/>
                    <h1 className="course-title">{t('sidebar.home')}</h1>
                </div>
                
                <div className="user-card">
                    <div className="avatar">{avatar}</div>
                    <div className="user-info">
                        <h4>{user?.username}</h4>
                        <span className="badge">{t('sidebar.student')}</span>
                    </div>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">{t('sidebar.options')}</h3>
                    <button onClick={naviteHome} className="btn">
                        <span className="material-icons icon">home</span>
                        {t('sidebar.home')}
                    </button>
                    <button className="btn">
                        <span className="material-icons icon">settings</span>
                        Ajustes
                    </button>
                    <button className="btn" onClick={logout}>
                        <span className="material-icons icon">logout</span>
                        {t('sidebar.logout')}
                    </button>
                    
                </div>
                <div className="menu-section">
                    <h3 className="section-title">{t('sidebar.my_courses')}</h3>
                    {enrolledCourses && enrolledCourses.map(curso => (
                        <button 
                        className="btn"
                        onClick={() => handleSelectCourse(curso)}
                        key={curso.id}>
                        <span className="material-icons icon">book</span>
                            {curso.title}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BarraLateralHome;