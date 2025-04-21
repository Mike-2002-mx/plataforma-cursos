import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if(token){
            
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        // setUser({
        //     name: userData.data.username,
        //     email: userData.data.email,
        //     roles: userData.data.roles
        // });
        setUser(null);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);