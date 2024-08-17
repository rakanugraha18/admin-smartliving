import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="md:flex justify-center items-center hidden lg:flex xl:flex">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16697A] focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FaSearch size={15} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
