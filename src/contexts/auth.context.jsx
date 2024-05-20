import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userJSON = JSON.parse(userData);
      setUser(userJSON);
    }
  }, []);

  const login = async value => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json);
      console.log(json);
      setUser(json);
      localStorage.setItem('user', JSON.stringify(json));
    } catch (error) {
      console.log(error.message);
    }
  };

  const register = () => {};

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
