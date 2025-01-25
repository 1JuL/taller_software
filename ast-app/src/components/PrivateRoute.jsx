// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
}

export default PrivateRoute;
