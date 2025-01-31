import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Root, RegForm, RegStaff, NotFound, Personas, Torneos, Entrenamiento, Pagos, Participacion, Unauthorized } from './pages';
import { ROUTES } from './routes';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas accesibles solo por el rol "admin" */}
            <Route path={ROUTES.HOME.path} element={<PrivateRoute allowedRoles={["user", "admin", "staff"]}><Home /></PrivateRoute>} />
            <Route path={ROUTES.PERSONAS.path} element={<PrivateRoute allowedRoles={["user", "admin", "staff"]}><Personas /></PrivateRoute>} />
            <Route path={ROUTES.TORNEOS.path} element={<PrivateRoute allowedRoles={["user", "admin", "staff"]}><Torneos /></PrivateRoute>} />
            <Route path={ROUTES.REGSTAFF.path} element={<PrivateRoute allowedRoles={["admin"]}><RegStaff /></PrivateRoute>} />

            {/* Ruta accesible por el rol "profesor" */}
            <Route path={ROUTES.ENTRENAMIENTO.path} element={<PrivateRoute allowedRoles={["user", "staff", "admin"]}><Entrenamiento /></PrivateRoute>} />

            {/* Rutas accesibles por los roles "user" y "admin" */}
            <Route path={ROUTES.PAGOS.path} element={<PrivateRoute allowedRoles={["user", "admin"]}><Pagos /></PrivateRoute>} />
            <Route path={ROUTES.PARTICIPACION.path} element={<PrivateRoute allowedRoles={["user", "admin"]}><Participacion /></PrivateRoute>} />

            {/* Rutas públicas */}
            <Route path={ROUTES.LOGIN.path} element={<Login />} />
            <Route path={ROUTES.ROOT.path} element={<Root />} />
            <Route path={ROUTES.REGISTER.path} element={<RegForm />} />

            {/* Rutas de errores */}
            <Route path={ROUTES.UNAUTHORIZED.path} element={<Unauthorized />} />
            <Route path={ROUTES.ERROR_404.path} element={<NotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.ERROR_404.path} replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;