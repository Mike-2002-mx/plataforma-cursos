import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CoursesProvider } from "../context/CoursesContext";
import { CourseContentProvider } from "../context/CourseContentContext";
import { InstructorCoursesProvider } from "../context/InstructorCoursesContext";

//Páginas publicas
import Login from '../pages/auth/Login';
import Register from "../pages/auth/Register";
import Home from "../pages/student/Home";
import Prueba from "../Prueba";
import VistaCurso from "../pages/student/VistaCurso";
import PaginaTema from "../pages/student/PaginaTema";
import PaginaLeccion from "../pages/student/PaginaLeccion";

import Dashboard from "../pages/instructor/Dashboard";
import CrearCurso from "../pages/instructor/CrearCurso";

const AppRoutes = () =>{
    return(
        <Routes>
            {/*Rutas públicas*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prueba" element={<Prueba/>}/>

             {/* Rutas para estudiantes (con contexto de cursos y contenidos) */}
            {/* <Route path="/home" element={<Home/>}/>
            <Route path="/curso" element={<VistaCurso/>}/>
            <Route path="/tema" element={<PaginaTema/>}/>
            <Route path="/leccion" element={<PaginaLeccion/>}/> */}


            <Route
                path="/home"
                element={
                <CoursesProvider>
                    <CourseContentProvider>
                        <Home/>
                    </CourseContentProvider>
                </CoursesProvider>
                }
            />
            <Route
                path="/curso"
                element={
                <CoursesProvider>
                    <CourseContentProvider>
                        <VistaCurso/>
                    </CourseContentProvider>
                </CoursesProvider>
                }
            />
            <Route
                path="/tema"
                element={
                <CoursesProvider>
                    <CourseContentProvider>
                        <PaginaTema />
                    </CourseContentProvider>
                </CoursesProvider>
                }
            />
            <Route
                path="/leccion"
                element={
                <CoursesProvider>
                    <CourseContentProvider>
                        <PaginaLeccion />
                    </CourseContentProvider>
                </CoursesProvider>
                }
            />

            {/*Rutas para instructores*/}
            <Route path="/dashboard" element={
                <InstructorCoursesProvider>
                    <Dashboard/>
                </InstructorCoursesProvider>
                }
            />

            <Route path="/crear-curso" element={
                <InstructorCoursesProvider>
                    <CrearCurso/>
                </InstructorCoursesProvider>
                }
            />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;