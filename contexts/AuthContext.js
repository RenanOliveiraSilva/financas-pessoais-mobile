import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (dadosUsuario) => {
    // Apenas salva o id ou objeto inteiro (sem token)
    await SecureStore.setItemAsync('user', JSON.stringify(dadosUsuario));
    setUser(dadosUsuario);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  const loadUser = async () => {
    const stored = await SecureStore.getItemAsync('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
