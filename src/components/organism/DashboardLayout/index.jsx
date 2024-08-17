import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../molecules/Navbar";

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen h-full bg-gray-100">
        <aside className="w-64 bg-[#EBEEF3] text-[#16697A] p-5">
          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/" className="hover:text-[#389db1]">
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/product" className="hover:text-[#389db1]">
                  Product
                </Link>
              </li>
              {/* Tambahkan item menu lainnya di sini */}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
