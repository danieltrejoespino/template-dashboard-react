import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {Login} from './components/Login/Login';
import {ResetUser} from './components/Login/ResetUser';
import {Home} from './components/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetUser" element={<ResetUser />} />
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
        </UserProvider>
      </AuthProvider>

    </>
  )
}

export default App
