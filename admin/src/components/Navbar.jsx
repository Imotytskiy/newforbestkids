import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext"; // Import context if needed
import { assets } from "../assets/assets"; // Verify path to assets

const Navbar = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <img
          className="w-[60%] max-w-[100px]"
          src={assets.logo_icon}
          alt="Logo"
        />
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
