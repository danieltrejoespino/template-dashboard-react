 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import { CajaAhorro } from '../components/CajaAhorro';
import { Index10 } from '../components/Index10';
import { AuthProvider } from '../context/AuthContext';
import { Encriptar  } from '../components/Encriptar';
import ProtectedRoute from './ProtectedRoute';



export const RoutesD = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/encriptar" element={<Encriptar />} />
          <Route path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/cajaAhorro"
            element={
              <ProtectedRoute>
                <CajaAhorro />
              </ProtectedRoute>
            }
          />
          <Route path="/index10"
            element={
              <ProtectedRoute>
                <Index10 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
