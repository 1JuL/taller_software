// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

const HASH_KEY = 'authState';

function encodeAuthState(isAuthenticated) {
    // Convierte el valor booleano a un hash usando if-else en lugar de ternario
    let valueToHash;
    if (isAuthenticated) {
        valueToHash = 'true';
    } else {
        valueToHash = 'false';
    }
    return CryptoJS.SHA256(valueToHash).toString();
}

function decodeAuthState(hash) {
    // Decodifica el hash y devuelve un valor booleano
    const decoded = CryptoJS.SHA256('true').toString() === hash;
    return decoded;
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Verifica si el estado de autenticación ya está guardado en el localStorage y decodifica el hash
        const savedAuthState = localStorage.getItem(HASH_KEY);
        if (savedAuthState) {
            return decodeAuthState(savedAuthState);
        } else {
            return false;
        }
    });

    useEffect(() => {
        // Guarda el estado de autenticación en el localStorage como un hash cuando cambie
        const authHash = encodeAuthState(isAuthenticated);
        localStorage.setItem(HASH_KEY, authHash);
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(HASH_KEY); // Borra el estado del localStorage al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}