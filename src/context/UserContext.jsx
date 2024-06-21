import { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    id: localStorage.getItem('userId') || '',
    profile: localStorage.getItem('profile') || '',
    apodo: localStorage.getItem('apodo') || '',
  });

  const setUserInfo = (name, id, profile,apodo) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
    localStorage.setItem('profile', profile);
    localStorage.setItem('apodo', apodo);
    setUser({ name, id,profile,apodo });
  };

  const clearUserInfo = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    localStorage.removeItem('apodo');
    setUser({ name: '', id: '', profile: '',apodo: '' });
};

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedId = localStorage.getItem('userId');
    const storedProfile = localStorage.getItem('profile');
    const storedApodo = localStorage.getItem('apodo');
    if (storedName && storedId && storedProfile) {
      setUser({ name: storedName, id: storedId,profile: storedProfile,apodo:storedApodo });
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUserInfo,clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
