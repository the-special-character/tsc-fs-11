import React, { createContext, useContext, useMemo, useState } from 'react';

export const RegisterContext = createContext();

export function RegisterProvider({ children }) {
  const [register, setRegister] = useState({});

  const value = useMemo(
    () => ({ register, setRegister }),
    [register, setRegister],
  );

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
