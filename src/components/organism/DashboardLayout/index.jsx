import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../molecules/Navbar";
import { AiFillDashboard } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { PiNotepadFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function DashboardLayout() {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen h-full bg-gray-100 justify-center">
        <aside className="w-60 bg-[#EBEEF3] text-[#16697A] p-5  pt-7">
          <nav className="flex justify-center">
            <ul>
              <li className="mb-4 flex flex-row gap-2 justify-start">
                <AiFillDashboard size={24} />
                <Link to="/" className="hover:text-[#389db1]">
                  Dashboard
                </Link>
              </li>
              <li className="mb-4 flex flex-col gap-2 justify-start">
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer"
                  onClick={toggleProductMenu}
                >
                  <IoCart size={24} />
                  <Link to="/product" className="hover:text-[#389db1]">
                    Product
                  </Link>
                  {isProductMenuOpen ? (
                    <IoIosArrowDown size={20} />
                  ) : (
                    <IoIosArrowUp size={20} />
                  )}
                </div>
                {isProductMenuOpen && (
                  <ul className="ml-8 mt-2">
                    <li className="mb-2">
                      <Link
                        to="/product/chair"
                        className="hover:text-[#389db1]"
                      >
                        Chair
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/product/table"
                        className="hover:text-[#389db1]"
                      >
                        Table
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/product/sofa" className="hover:text-[#389db1]">
                        Sofa
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/product/shelve"
                        className="hover:text-[#389db1]"
                      >
                        Shelve
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/product/lamp" className="hover:text-[#389db1]">
                        Lamp
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/product/bed" className="hover:text-[#389db1]">
                        Bed
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/product/cabinet"
                        className="hover:text-[#389db1]"
                      >
                        Cabinet
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/product/wardrobe"
                        className="hover:text-[#389db1]"
                      >
                        Wardrobe
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-4 flex flex-row gap-2 justify-start">
                <PiNotepadFill size={24} />
                <Link to="/orders" className="hover:text-[#389db1]">
                  Orders
                </Link>
              </li>
              {/* Add more menu items here */}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
