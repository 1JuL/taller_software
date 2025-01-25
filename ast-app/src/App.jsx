import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Root, RegForm, NotFound, Personas, Torneos, Entrenamiento, Pagos } from './pages'
import { ROUTES } from './routes';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME.path} element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path={ROUTES.PERSONAS.path} element={<PrivateRoute><Personas /></PrivateRoute>} />
            <Route path={ROUTES.TORNEOS.path} element={<PrivateRoute><Torneos /></PrivateRoute>} />
            <Route path={ROUTES.ENTRENAMIENTO.path} element={<PrivateRoute><Entrenamiento /></PrivateRoute>} />
            <Route path={ROUTES.PAGOS.path} element={<PrivateRoute><Pagos /></PrivateRoute>} />
            <Route path={ROUTES.LOGIN.path} element={<Login />} />
            <Route path={ROUTES.ROOT.path} element={<Root />} />
            <Route path={ROUTES.REGISTER.path} element={<RegForm />} />
            <Route path={ROUTES.ERROR_404.path} element={<NotFound />} />
            <Route path="*" element={<Navigate to={ROUTES.ERROR_404.path} replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App