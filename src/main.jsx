// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DashboardPage from "./pages/dashboard.jsx";
// import LoginPage from "./pages/login.jsx";
// import RegisterPage from "./pages/register.jsx";
// import AddProductPage from "./pages/addProduct.jsx";
// import ProductPage from "./pages/product.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/", element: <DashboardPage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/register", element: <RegisterPage /> },
//       { path: "/add-product", element: <AddProductPage /> },
//       { path: "/product", element: <ProductPage /> },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DashboardPage from "./pages/dashboard.jsx";
// import LoginPage from "./pages/login.jsx";
// import RegisterPage from "./pages/register.jsx";
// import AddProductPage from "./pages/addProduct.jsx";
// import ProductPage from "./pages/product.jsx";
// import PrivateRoute from "./components/organism/PrivateRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/", element: <PrivateRoute element={<DashboardPage />} /> },
//       { path: "/product", element: <PrivateRoute element={<ProductPage />} /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/register", element: <RegisterPage /> },
//       { path: "/add-product", element: <AddProductPage /> },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
