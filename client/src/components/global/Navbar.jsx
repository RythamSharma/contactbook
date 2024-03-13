import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Navbar({ setSearchQuery, queryChange, searchQuery,setPage }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    queryChange();
  };

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-gray-800 text-white py-4 px-1 md:px-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-center text-xl md:text-2xl font-semibold">
          Contact
          <span className="text-blue-700">U</span>
        </h2>
        <div className="flex">
          <div className="relative ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e)=>{setSearchQuery(e.target.value) }}
              className=" border-gray-600 transition-all duration-500 ease-in-out pl-8 pr-4 py-1 w-36 focus:w-40 md:w-64 bg-transparent border-b outline-none focus:border-blue-400 md:focus:w-72 "
              placeholder="Search Contacts"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0,0,256,256"
            >
              <g
                fill="#ffffff"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z"></path>
                </g>
              </g>
            </svg>
          </div>
          <button
            onClick={handleSearch}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 md:px-3 py-1.5 md:me-2 mb-2 dark:bg-gray-900 md:ml-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-800"
          >
            search
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-900 hover:text-blue-500 focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 md:px-3 py-1.5 md:me-0 mb-2 dark:bg-gray-800 underline md:ml-0 dark:text-white dark:hover:border-gray-600 dark:focus:ring-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
