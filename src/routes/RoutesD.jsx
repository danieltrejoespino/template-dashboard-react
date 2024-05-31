import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import { CajaAhorro } from '../components/CajaAhorro';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';



export const RoutesD = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/cajaAhorro" element={<CajaAhorro />} /> */}
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
