import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import './header.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const  Header = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        setName(localStorage.getItem('username'));
    },[]);

    const logout = () => {
        localStorage.removeItem('token');
        console.log("Cerrando sesión...");
        navigate('/login')
    }

    return(
        <>
            <header className='encabezado'>
                <div className='encabezado__cerrarsesion'>
                    <button className='btn_cerrarsesion' onClick={logout}>
                        <IoLogOut size={40}/>
                        Cerrar sesión
                    </button>
                </div>
                <div className='encabezado__nombrepagina' >
                    <h2>Página de inicio</h2>
                </div>
                <div className='encabezado__usuario'>
                    <CgProfile color="#FFFFFF" size={40}/>
                    <p>{name}</p>
                </div>
            </header>
        </>
    )
}

export default Header;