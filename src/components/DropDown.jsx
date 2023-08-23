"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const DropDown = ({ name, id }) => {
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);

  const slugName = name.toLowerCase().replace(/ /g, "-");

  const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleDropDown}
      >
        {name}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {dropDown && (
        <div
          id="dropdownDivider"
          className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <a
                href={`/profile/${id}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDown;
