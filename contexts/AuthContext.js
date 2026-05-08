import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@ReUse:user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) {}
    setLoading(false);
  };

  const login = async (email, password) => {
    const fakeUser = {
      id: '1',
      name: 'João Verde',
      email,
      avatar: 'https://picsum.photos/id/64/300/300',
      points: 1240,
      level: 8,
      streak: 12,
    };
    await AsyncStorage.setItem('@ReUse:user', JSON.stringify(fakeUser));
    setUser(fakeUser);
    return true;
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@ReUse:user');
      setUser(null);        
    } catch (e) {}
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};