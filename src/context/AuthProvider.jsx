import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      setUser({ username });
    }
  }, []);

  const login = (username) => {
    sessionStorage.setItem('username', username);
    setUser({ username });
  };

  const logout = () => {
    sessionStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
