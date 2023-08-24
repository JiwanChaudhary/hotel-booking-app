"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

const AllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState([]);
  // get all rooms
  const getAllUsers = async () => {
    setLoading(true);
    const response = await axios.get(`/api/users`);
    const data = response.data;
    setTotalUsers(data.allUsers);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center">
          <b>All Users</b>
        </h1>
        {loading && <Loader />}
        <p>There are total {totalUsers.length} users</p>
        {/* Table */}
        <table className="w-full max-w-md border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {totalUsers.map((item, index) => (
              <tr
                key={item._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2">{item._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.isAdmin === true ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
