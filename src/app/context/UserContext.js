import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guardar los datos del usuario en el estado del contexto
  const [token, setToken] = useState(null); // Guardar el token en el estado

  const saveUserData = (userData, userToken) => {
    setUser(userData); // Guardamos solo los datos del usuario
    setToken(userToken); // Guardamos el token

    // También guardamos en localStorage para persistencia entre recargas
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  return (
    <UserContext.Provider value={{ user, token, saveUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
