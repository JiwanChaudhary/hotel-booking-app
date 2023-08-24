"use client";

import AddRoom from "@/components/AddRoom";
import AllRooms from "@/components/AllRooms";
import AllUsers from "@/components/AllUsers";
import Bookings from "@/components/Bookings";
import Loader from "@/components/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminScreen = () => {
  const [showBookings, setShowBookings] = useState(true);
  const [showRooms, setShowRooms] = useState(false);
  const [addRoom, setAddRoom] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  return (
    <>
      <h1 className="font-bold text-center">Admin Panel</h1>
      <div className="flex flex-col justify-between w-4/5 gap-6">
        <div className="flex flex-row px-4 py-4 justify-between w-4/5 mb-4">
          {/* bookings */}
          <button
            className={`block py-2 pl-3 pr-4 text-white rounded w-fit ${
              showBookings ? "bg-blue-700" : "bg-black"
            }`}
            onClick={() => {
              setShowBookings(true);
              setShowRooms(false);
              setAddRoom(false);
              setShowUsers(false);
            }}
          >
            Bookings
          </button>
          {/* rooms */}
          <button
            className={`block py-2 pl-3 pr-4 text-white  rounded w-fit ${
              showRooms ? "bg-blue-700" : "bg-black"
            }`}
            onClick={() => {
              setShowBookings(false);
              setShowRooms(true);
              setAddRoom(false);
              setShowUsers(false);
            }}
          >
            Rooms
          </button>
          {/* add room */}
          <button
            className={`block py-2 pl-3 pr-4 text-white rounded w-fit ${
              addRoom ? "bg-blue-700" : "bg-black"
            }`}
            onClick={() => {
              setShowBookings(false);
              setShowRooms(false);
              setAddRoom(true);
              setShowUsers(false);
            }}
          >
            Add Room
          </button>
          {/* users */}
          <button
            className={`block py-2 pl-3 pr-4 text-white rounded w-fit ${
              showUsers ? "bg-blue-700" : "bg-black"
            }`}
            onClick={() => {
              setShowBookings(false);
              setShowRooms(false);
              setAddRoom(false);
              setShowUsers(true);
            }}
          >
            Users
          </button>
        </div>
        <div>
          {/* bookings */}
          {showBookings && (
            <>
              <Bookings />
            </>
          )}
          {/* rooms */}
          {showRooms && (
            <>
              <AllRooms />
            </>
          )}
          {/* add room */}
          {addRoom && (
            <>
              <AddRoom />
            </>
          )}
          {/* users */}
          {showUsers && (
            <>
              <AllUsers />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminScreen;
