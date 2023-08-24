"use client";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [roomBookings, setRoomBookings] = useState([]);
  // get all bookings
  const getAllBookings = async () => {
    setLoading(true);
    const response = await axios.get(`/api/book-room`);
    const data = response.data;
    setRoomBookings(data.allBookings);
    setLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="flex flex-row">
      <div>
        <h1 className="text-center">
          <b>Bookings</b>
        </h1>
        {loading && <Loader />}
        <p>There are total of {roomBookings.length} bookings</p>
        {/* Table */}
        <table className="w-full max-w-md border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Room ID</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">From</th>
              <th className="border border-gray-300 px-4 py-2">To</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {roomBookings.map((item, index) => (
              <tr
                key={item._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.roomId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.fromDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.toDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
