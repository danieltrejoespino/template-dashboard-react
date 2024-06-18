import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null
  });

  const login = (token) => {
    setAuthState({
      isAuthenticated: true,
      token
    });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};