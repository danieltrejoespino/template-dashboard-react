import { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    id: localStorage.getItem('userId') || '',
    profile: localStorage.getItem('profile') || '',
  });

  const setUserInfo = (name, id, profile) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
    localStorage.setItem('profile', profile);
    setUser({ name, id,profile });
  };

  const clearUserInfo = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    setUser({ name: '', id: '', profile: '' });
};

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedId = localStorage.getItem('userId');
    const storedProfile = localStorage.getItem('profile');
    if (storedName && storedId && storedProfile) {
      setUser({ name: storedName, id: storedId,profile: storedProfile });
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUserInfo,clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
