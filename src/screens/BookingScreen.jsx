"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

const BookingScreen = () => {
  const params = useParams();
  const id = params.id;

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const BookRoom = async () => {
    try {
      setLoading(true);
      // setError(true)
      const response = await axios.post(`/api/rooms/${id}`, { id });
      const { data } = response;
      // console.log(data.room);
      setRoom(data.room);
      setLoading(false);
      // console.log(response.data.room);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    BookRoom();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : room ? (
          <div className="flex flex-row">
            <div className="md:w-1/3">
              <h1>{room.name}</h1>
              <Image
                src={room.imageUrls[0]}
                alt="room"
                width={250}
                height={200}
              />
            </div>
            <div className="md:w-1/3">
              {/* booking details */}
              <div>
                <h1>Booking Derails</h1>
                <hr />
                <b>
                  <p>Name: Jiwan</p>
                  <p>From Date: 2023-12-12</p>
                  <p>To Date: 2023-12-12</p>
                  <p>Max Count: {room.maxCount}</p>
                </b>
              </div>
              {/* Amount details */}
              <div>
                <h1>Amount</h1>
                <b>
                  <hr />
                  <p>Total Day</p>
                  <p>Rent Per Day: {room.rentPerDay}</p>
                  <p>Total Amount</p>
                </b>
              </div>
              {/* button */}
              <div className="float-right">
                <button className="bg-black text-white font-semibold py-1.5 px-4 rounded">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </div>
    </>
  );
};

export default BookingScreen;
