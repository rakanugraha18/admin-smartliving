import React, { createContext, useState, useContext, useEffect } from "react";
import loginUser from "../components/api/loginUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token)
        .then((userInfo) => {
          setUser(userInfo);
          setIsAuthenticated(true);
        })
        .catch(() => {
          handleLogout(); // Handling failed token validation
        });
    } else {
      handleLogout(); // Handle when there's no token
    }
  }, [navigate]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/api/admin/admin-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const token = await loginUser(email, password);
      setIsAuthenticated(true);
      setUser({ email });
      localStorage.setItem("token", token);
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("loggedIn");
    setIsAuthenticated(false);
    setUser(null);
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        token: localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
