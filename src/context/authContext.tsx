import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import instance from '../lib/axios';

interface Role {
  name: string;
}

interface User {
  email: string;
  tel: string;
  firstName: string;
  id: number;
  lastName: string;
  roles: Role[];
}


interface AuthContext {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}


const initialAuthContextValue: AuthContext = {
  user: undefined,
  setUser: () => { },
  isAuthorized: false,
  setIsAuthorized: () => { }
}

export const AuthContext = createContext<AuthContext>(initialAuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(localStorage.getItem('isAuthorized') === 'true');

  useEffect(() => {
    if (isAuthorized) {
      instance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((response) => {
        setUser(response.data);

      }).catch(() => {
        setIsAuthorized(false);
      });
    }
  }, [isAuthorized]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthorized, setIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
