import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ai from '../utils';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(() => {
    const data = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  });

  const login = useCallback(async data => {
    try {
      const res = await ai.post('login', data);
      localStorage.setItem('user', JSON.stringify(res));
      setuser(res);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const register = useCallback(async data => {
    try {
      const res = await ai.post('register', data);
      localStorage.setItem('user', JSON.stringify(res));
      setuser(res);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const logout = useCallback(() => {}, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
