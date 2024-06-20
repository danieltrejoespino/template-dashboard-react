import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {Login} from './components/Login';
import {Home} from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>

    </>
  )
}

export default App
