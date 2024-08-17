import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ImageProvider } from "./context/imageContext";
import DashboardLayout from "./components/organism/DashboardLayout";

function App() {
  const location = useLocation();
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <AuthProvider>
      <ImageProvider>
        {showHeader ? (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        ) : (
          <Outlet /> // Pastikan Outlet tetap dirender saat showHeader false
        )}
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;
