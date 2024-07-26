import React, { createContext, useContext, useState } from 'react';
import jwt from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);


  const login = () => {
    try {
      console.log('logging in...');
      const userString = sessionStorage.getItem('user');
      if (!userString) return;

      let userObject = {};
      userObject = jwt(userString);
      if (!userObject) return;
      

      userObject.token = userString;
      setUser(userObject);
      
    } catch (error) {
      console.log(error);
    }

  };
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    localStorage.removeItem('selectedMenuItem')
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user: user, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
