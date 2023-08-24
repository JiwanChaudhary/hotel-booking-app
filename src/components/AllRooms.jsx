"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

const AllRooms = () => {
  const [loading, setLoading] = useState(true);
  const [totalRooms, setTotalRooms] = useState([]);
  // get all rooms
  const getAllRooms = async () => {
    setLoading(true);
    const response = await axios.get(`/api/rooms`);
    const data = response.data;
    setTotalRooms(data.room);
    setLoading(false);
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center">
          <b>All Rooms</b>
        </h1>
        {loading && <Loader />}
        <p>There are total of {totalRooms.length} rooms</p>
        {/* Table */}
        <table className="w-full max-w-md border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Room ID</th>
              <th className="border border-gray-300 px-4 py-2">Room Name</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Rent Per Day</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {totalRooms.map((item, index) => (
              <tr
                key={item._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2">{item._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.rentPerDay}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllRooms;
