
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [email, setEmail] = useState(localStorage.getItem("token") || "");

  const login = (email) => {
    setIsAuthenticated(true);
    setEmail(email);
    localStorage.setItem("token", email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};
