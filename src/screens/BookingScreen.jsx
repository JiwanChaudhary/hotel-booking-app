"use client"
import React, {useEffect, useState} from "react";
import { useParams } from "next/navigation";

const BookingScreen = () => {
  const params = useParams();
  const id = params.id;

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const BookRoom = async () => {
    try {
        setLoading(true);
        const response = await axios.post(`/api/rooms`);
        const { data } = response;
        setRoom(data.room);
        setLoading(false);
        // console.log(data);
        // console.log(response.data.room);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
  }

  useEffect(() => {
    BookRoom();
  },[]);


  return (
    <>
      <div>BookingScreen</div>
      <h1>Room id is: {id}</h1>
    </>
  );
};

export default BookingScreen;
