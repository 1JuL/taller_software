import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
    const { user, role } = useAuth();

    // Si el usuario no está autenticado, redirige al login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Si el rol del usuario no está en la lista de roles permitidos, redirige a "No autorizado"
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si el usuario tiene un rol permitido, renderiza el componente hijo
    return children;
};

export default PrivateRoute;