import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import logoSmartLiving from "../../../assets/LogoSmartLiving.svg";
import axios from "axios";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State untuk nama pengguna
  const { isAuthenticated, logout, token } = useAuth(); // Dapatkan status login, fungsi logout, dan token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if ((isAuthenticated, token)) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/admin/admin-profile",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Kirim token untuk otentikasi
              },
            }
          );
          setUserName(response.data); // Atur nama pengguna dari respons API
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, token]); // Re-fetch jika status login atau token berubah

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout
    navigate("/login");
  };

  return (
    <header className="bg-white text-[#16697A] h-28 flex items-center justify-between px-6 shadow-lg border border-b border-spacing-1">
      <div className="text-2xl font-bold">
        <img src={logoSmartLiving} className="h-20" alt="" />
      </div>
      <div className="relative">
        <button onClick={handleDropdownToggle} className="flex items-center">
          <span className="mr-2">
            {userName.first_name} {userName.last_name}
          </span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg">
            <ul>
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                {isAuthenticated && (
                  <div className="text-center md:block group">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
