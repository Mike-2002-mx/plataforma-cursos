import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CoursesProvider } from "../context/CoursesContext";
import { CourseContentProvider } from "../context/CourseContentContext";
import { InstructorCoursesProvider } from "../context/InstructorCoursesContext";
import { InstructorContentProvider } from "../context/InstructorContentContext";

//Páginas publicas
import Login from '../pages/auth/Login';
import Register from "../pages/auth/Register";
import Landing from "../pages/auth/Landing";

//Páginas student
import Home from "../pages/student/Home";
import Prueba from "../Prueba";
import VistaCurso from "../pages/student/VistaCurso";
import PaginaTema from "../pages/student/PaginaTema";
import PaginaLeccion from "../pages/student/PaginaLeccion";

import Dashboard from "../pages/instructor/Dashboard";
import CrearCurso from "../pages/instructor/CrearCurso";
import DashboardCurso from "../pages/instructor/DashboardCurso";
import CrearTema from "../pages/instructor/CrearTema";
import DashboardTema from "../pages/instructor/DashboardTema";
import CrearLeccion from "../pages/instructor/CrearLeccion";

const AppRoutes = () =>{
    return(
        <Routes>
            {/*Rutas públicas*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Landing/>}/>

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
                    <InstructorContentProvider>
                        <CrearCurso/>
                    </InstructorContentProvider>
                </InstructorCoursesProvider>
                }
            />

            <Route path="/vista-curso" element={
                <InstructorCoursesProvider>
                    <InstructorContentProvider>
                        <DashboardCurso/>
                    </InstructorContentProvider>
                </InstructorCoursesProvider>
                }
            />

            <Route path="/crear-tema" element={
                <InstructorCoursesProvider>
                    <InstructorContentProvider>
                        <CrearTema/>
                    </InstructorContentProvider>
                </InstructorCoursesProvider>
                }
            />

            <Route path="/vista-tema" element={
                <InstructorCoursesProvider>
                    <InstructorContentProvider>
                        <DashboardTema/>
                    </InstructorContentProvider>
                </InstructorCoursesProvider>
                }
            />

            <Route path="/crear-leccion" element={
                <InstructorCoursesProvider>
                    <InstructorContentProvider>
                        <CrearLeccion/>
                    </InstructorContentProvider>
                </InstructorCoursesProvider>
                }
            />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;