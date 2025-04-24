import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//Páginas publicas
import Login from '../pages/auth/Login';
import Register from "../pages/auth/Register";
import Dashboard from "../pages/instructor/Dashboard";
import Home from "../pages/student/Home";
import Prueba from "../Prueba";
import VistaCurso from "../pages/student/VistaCurso";
import PaginaTema from "../pages/student/PaginaTema";
import PaginaLeccion from "../pages/student/PaginaLeccion";


const ProtectedRoute = ({children}) =>{
    const {isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>
}
const AppRoutes = () =>{
    return(
        <Routes>
            {/*Rutas públicas*/}
            {/* <Route path="/" element={<Landing />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prueba" element={<Prueba/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/curso" element={<VistaCurso/>}/>
            <Route path="/tema" element={<PaginaTema/>}/>
            <Route path="/leccion" element={<PaginaLeccion/>}/>

             {/* Rutas protegidas student */}
            {/* <Route path="/home" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>
            }/> */}

            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;