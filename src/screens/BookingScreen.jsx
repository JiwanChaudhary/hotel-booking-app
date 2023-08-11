"use client"
import React from "react";
import { useParams } from "next/navigation";

const BookingScreen = () => {
  const params = useParams();
  const id = params.id;
  return (
    <>
      <div>BookingScreen</div>
      <h1>Room id is: {id}</h1>
    </>
  );
};

export default BookingScreen;
