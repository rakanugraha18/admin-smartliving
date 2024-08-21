// import React, { createContext, useState, useContext, useEffect } from "react";
// import loginUser from "../components/api/loginUser";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token on mount:", token);

//     if (token) {
//       fetchUserInfo(token)
//         .then((userInfo) => {
//           console.log("User info fetched:", userInfo);
//           setUser(userInfo);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           console.error("Fetching user info failed");
//           setIsAuthenticated(false);
//           localStorage.removeItem("token");
//           navigate("/login");
//         });
//     } else {
//       console.log("No token found on mount");
//       setIsAuthenticated(false);
//       navigate("/login");
//     }
//   }, [navigate]);

//   const fetchUserInfo = async (token) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/admin-profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       throw error;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const token = await loginUser(email, password);
//       setIsAuthenticated(true);
//       setUser({ email });
//       localStorage.setItem("token", token);
//     } catch (error) {
//       setIsAuthenticated(false);
//       throw new Error("Login failed");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_id");
//     navigate("/login");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isAuthenticated,
//         user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

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
        "http://localhost:3000/api/admin/admin-profile",
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
