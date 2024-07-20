import { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ID_USER: localStorage.getItem('ID_USER') || '',
    NOMINA: localStorage.getItem('NOMINA') || '',
    NAME_USER: localStorage.getItem('NAME_USER') || '',
    EMPRESA: localStorage.getItem('EMPRESA') || '',
    PERFIL: localStorage.getItem('PERFIL') || '',
    MODALITY: localStorage.getItem('MODALITY') || '',
  });

  const setUserInfo = (ID_USER, NOMINA, NAME_USER,EMPRESA,PERFIL,MODALITY) => {
    localStorage.setItem('ID_USER', ID_USER);
    localStorage.setItem('NOMINA', NOMINA);    
    localStorage.setItem('NAME_USER', NAME_USER);
    localStorage.setItem('EMPRESA', EMPRESA);
    localStorage.setItem('PERFIL', PERFIL);
    localStorage.setItem('MODALITY', MODALITY);
    setUser({ ID_USER, NOMINA, NAME_USER,EMPRESA,PERFIL,MODALITY });

  };

  const clearUserInfo = () => {
    localStorage.removeItem('ID_USER', ID_USER);
    localStorage.removeItem('NOMINA', NOMINA);
    localStorage.removeItem('NAME_USER', NAME_USER);
    localStorage.removeItem('EMPRESA', EMPRESA);
    localStorage.removeItem('PERFIL', PERFIL);
    localStorage.removeItem('MODALITY', MODALITY);

    setUser({ ID_USER: '', NOMINA: '', NAME_USER: '',EMPRESA:"", PERFIL : "", MODALITY: "" });
};

  useEffect(() => {
    const storedID_USER = localStorage.getItem('ID_USER');
    const storedNOMINA = localStorage.getItem('NOMINA');
    const storedNAME_USER = localStorage.getItem('NAME_USER');
    const storedEMPRESA = localStorage.getItem('EMPRESA');
    const storedPERFIL = localStorage.getItem('PERFIL');
    const storedMODALITY = localStorage.getItem('MODALITY');
    if (storedID_USER && storedNOMINA) {
      setUser({ ID_USER: storedID_USER, NOMINA: storedNOMINA, NAME_USER: storedNAME_USER,EMPRESA: storedEMPRESA, PERFIL : storedPERFIL, MODALITY: storedMODALITY });
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUserInfo,clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
