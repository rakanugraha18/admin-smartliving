// import { Outlet, useLocation } from "react-router-dom";
// import { AuthProvider } from "./context/authContext";
// import { ImageProvider } from "./context/imageContext";
// import DashboardLayout from "./components/organism/DashboardLayout";

// function App() {
//   const location = useLocation();
//   const showHeader =
//     location.pathname !== "/login" && location.pathname !== "/register";

//   return (
//     <AuthProvider>
//       <ImageProvider>
//         {showHeader ? (
//           <DashboardLayout>
//             <Outlet />
//           </DashboardLayout>
//         ) : (
//           <Outlet /> // Ensure Outlet is still rendered when showHeader is false
//         )}
//       </ImageProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ImageProvider } from "./context/ImgUrlContext";
import DashboardLayout from "./components/organism/DashboardLayout";
import PrivateRoutes from "./utils/PrivateRoutes";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AddProductPage from "./pages/addProduct";
import ProductPage from "./pages/product";
import EditProductPage from "./pages/editProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <ImageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoutes />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="add-product" element={<AddProductPage />} />
                  <Route path="product" element={<ProductPage />} />
                  <Route
                    path="edit-product/:id"
                    element={<EditProductPage />}
                  />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ImageProvider>
      </Router>
    </div>
  );
}

export default App;
