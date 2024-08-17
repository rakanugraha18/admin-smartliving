import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <main>
            <Outlet />
          </main>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
