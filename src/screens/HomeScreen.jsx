"use client";

import Room from "@/components/Room";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const getAllRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rooms`);
      const { data } = response;
      setRooms(data.room);
      setLoading(false);
      // console.log(data);
      // console.log(response.data.room);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex flex-col justify-center m-auto">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>Error</h1>
          ) : (
            rooms.map((room) => {
              return (
                <div key={room._id} className="col-span-9">
                  <Room room={room} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
