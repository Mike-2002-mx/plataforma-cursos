import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('userData');
        if (token && usuarioGuardado) {
            try {
                const userData = JSON.parse(usuarioGuardado);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing userData:', error);
                logout();
            }
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = async() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);