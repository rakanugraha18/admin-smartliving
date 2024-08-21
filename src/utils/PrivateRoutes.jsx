// import { Outlet, Navigate } from "react-router-dom";

// const PrivateRoutes = () => {
//   const token = localStorage.getItem("loggedIn");
//   let auth = { token: token };
//   return auth.token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoutes;

import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("loggedIn");
  const location = useLocation();
  const { pathname } = location;

  // Daftar rute yang tidak memerlukan autentikasi
  const publicRoutes = ["/login", "/register"];

  // Jika rute saat ini termasuk dalam daftar rute publik
  if (publicRoutes.includes(pathname)) {
    return <Outlet />;
  }

  // Jika token ada, tampilkan outlet
  // Jika tidak, arahkan ke halaman login
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
