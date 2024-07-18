import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAUthProviderProps, IUser } from '../types/auth';

const AuthContext = createContext<{
  user: IUser | null;
  authLogin: (username: string) => void;
  authLogout: () => void;
  isLoggedIn: () => boolean;
  isFromUser: (username: string) => boolean;
} | null>(null);

export const AuthProvider: React.FC<IAUthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      setUser({ username });
    }
  }, []);

  const authLogin = (username : string) => {
    sessionStorage.setItem('username', username);
    setUser({ username });
  };

  const authLogout = () => {
    sessionStorage.removeItem('username');
    setUser(null);
  };

  const isFromUser = (username: string) => {
    return user?.username === username;
  }

  const isLoggedIn = () => {
    return user !== null;
  }

  return (
    <AuthContext.Provider value={{ user, authLogin, authLogout, isLoggedIn, isFromUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
