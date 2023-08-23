"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const ProfileScreen = ({ id }) => {
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      isAdmin: false,
    },
  ]);

  const [userProfile, setUserProfile] = useState(true);
  const [userBooking, setUserBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getUser() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${id}`);
      const { data } = res;
      // console.log(data);
      setUser(data.user);
      setLoading(false);
      // console.log(user);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
  // console.log(user);

  useEffect(() => {
    getUser();
  }, []);

  // handle profile
  const handleProfile = () => {
    setUserProfile(true);
    setUserBooking(false);
  };

  // handle booking
  const handleBookings = () => {
    setUserBooking(true);
    setUserProfile(false);
  };

  return (
    <div>
      <div className="flex flex-row gap-5 px-5 py-5">
        {/* Header */}
        <div className="flex flex-col gap-5 px-5 py-5 space-x-4">
          <button
            onClick={handleProfile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleBookings}
            className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Bookings
          </button>
        </div>
        <div className="flex float-right">
          {loading && <Loader />}
          {userProfile && (
            <h1 className="border-r-4 px-2 py-2 font-bold">Profile Details</h1>
          )}
          {userBooking && (
            <h1 className="border-r-4 my-2 px-2 py-2 font-bold">
              Bookings Details
            </h1>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex float-right">
        {userProfile && (
          <div>
            <h1 className="font-medium">Name: {user.name}</h1>
            <h1 className="font-medium">Email: {user.email}</h1>
            <h1 className="font-medium">
              isAdmin: {user.isAdmin ? "Yes" : "No"}
            </h1>
          </div>
        )}
        {userBooking && (
          <div>
            <MyBookings id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;

// Bookings
export function MyBookings({ id }) {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBookingDetails() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/book-room/${id}`);
      const { data } = res;
      setBookings(data.room);
      console.log(data.room);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(bookings);

  useEffect(() => {
    getBookingDetails();
  }, []);

  const cancelBooking = async (bookingId, roomId) => {
    try { 
      setLoading(true);
      const results = await axios.put(`/api/rooms/cancel-booking`, {
        bookingId,
      });
      const canc = await axios.post(`/api/rooms/cancel-booking`, {
        roomId,
        bookingId,
      });
      // console.log("roomId:", roomId);
      // console.log("bookingId:", bookingId);
      alert("Room Cancelled Successfully!");
      router.refresh();
      setLoading(false);

      // console.log(results);
      // console.log(canc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {bookings &&
        bookings.map((booking) => {
          return (
            <>
              <div className="px-4 py-4">
                <h2>Room Name: {booking.room}</h2>
                <h2>Check In: {booking.fromDate}</h2>
                <h2>Check Out: {booking.toDate}</h2>
                <h2>Total Days: {booking.totalDays}</h2>
                <h2>Amount: {booking.totalAmount}</h2>
                <h2>
                  Status:{" "}
                  <span className="bg-blue-500 text-white px-4 py-5 rounded">
                    {booking.status === "booked" ? "CONFIRMED" : "CANCELLED"}
                  </span>
                </h2>
                <button
                  onClick={() => cancelBooking(booking._id, booking.roomId)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded float-right"
                >
                  Cancel
                </button>
              </div>
              <hr className="font-bold px-5 text-black" />
            </>
          );
        })}
    </>
  );
}
