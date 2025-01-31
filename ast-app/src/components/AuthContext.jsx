import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Almacena el usuario de Firebase
    const [role, setRole] = useState(null); // Almacena el rol del usuario

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userRole = await fetchUserRole(user.uid);
                setRole(userRole);
            } else {
                setUser(null);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRole = await fetchUserRole(user.uid);
            setRole(userRole);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole(null);
        } catch (error) {
            throw error;
        }
    };

    const fetchUserRole = async (uid) => {
        // Llama a tu API para obtener el rol del usuario basado en su UID
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/personas/uid/${uid}/role`);
        return response.data.role;
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}