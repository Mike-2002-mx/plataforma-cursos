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
        navigate('/');
    }

    return (
        <>
            <div className="sidebar">
                <div className="logo-container">
                    <img src="https://res.cloudinary.com/do0g84jlj/image/upload/v1750138053/Logo_wz64ec.png" alt="Logo" className="logo"/>
                    <h1 className="page-title">Momachtia TIC</h1>
                </div>
                
                <div className="user-card">
                    <div className="avatarHome">{avatar}</div>
                    <div className="user-info">
                        <h4>{user?.username}</h4>
                        <span className="badge">{t('sidebar.student')}</span>
                    </div>
                </div>
                
                <div className="menu-section">
                    <h3 className="section-title">{t('sidebar.options')}</h3>
                    <button onClick={naviteHome} className="btnLateral">
                        <span className="material-icons icon">home</span>
                        {t('sidebar.home')}
                    </button>
                    <button className="btnLateral" onClick={logout}>
                        <span className="material-icons icon">logout</span>
                        {t('sidebar.logout')}
                    </button>
                </div>
                <div className="menu-section">
                    <h3 className="section-title">{t('sidebar.my_courses')}</h3>
                    {enrolledCourses && enrolledCourses.map(curso => (
                        <button 
                        className="btnLateral"
                        onClick={() => handleSelectCourse(curso)}
                        key={curso.id}>
                        <span className="material-icons icon">book</span>
                            <p className='lateralCursoTitle'>{curso.title}</p>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BarraLateralHome;