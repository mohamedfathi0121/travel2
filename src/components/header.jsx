import React, { useState } from "react";
import { FiSearch, FiMenu, FiX, FiUser } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md z-50 relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
   
        <div className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">AdventureCo</div>
   
        <ul className="hidden md:flex space-x-6 ml-6 text-sm font-medium text-gray-700">
          <li><a href="#" className="hover:text-blue-600">Explore</a></li>
          <li><a href="#" className="hover:text-blue-600">Create</a></li>
          <li><a href="#" className="hover:text-blue-600">About</a></li>
        </ul>

        <div className="flex items-center space-x-3 relative">
     
          <div className="relative w-24 sm:w-32 md:w-48">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500 text-lg" />
          </div>

          
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-gray-700 hover:text-blue-600 text-xl focus:outline-none"
            >
              <FiUser />
            </button>

            {/* DROPDOWN MENU */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Login</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Up</a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? (
              <FiX className="w-6 h-6 text-gray-800" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-3 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-blue-600">Explore</a>
          <a href="#" className="hover:text-blue-600">Create</a>
          <a href="#" className="hover:text-blue-600">About</a>
        </div>
      )}
    </header>
  );
}
