"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import { useRoomContext } from "@/hooks/context";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const BookingScreen = () => {
  const params = useParams();
  const id = params.id;

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { fromDate, toDate } = useRoomContext();
  const [totalAmount, setTotalAmount] = useState();

  const momentFromDate = moment(fromDate, "DD-MM-YYYY");
  const momentToDate = moment(toDate, "DD-MM-YYYY");

  // total days
  const totalDays =
    moment.duration(momentToDate.diff(momentFromDate)).asDays() + 1;

  const BookRoom = async () => {
    try {
      setLoading(true);
      // setError(true)
      const response = await axios.post(`/api/rooms/${id}`, { id });
      const { data } = response;
      // console.log(data.room);
      setRoom(data.room);
      setTotalAmount(data.room.rentPerDay * totalDays);
      setLoading(false);
      // console.log(response.data.room);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(fromDate);
  // console.log(toDate);

  useEffect(() => {
    BookRoom();
  }, []);

  // stripe checkout
  async function onToken(token) {
    const bookingDetails = {
      room,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      await axios.post(`/api/book-room`, bookingDetails);
    } catch (error) {
      console.log(error);
    }
  }

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
                  <p>From Date: {fromDate}</p>
                  <p>To Date: {toDate}</p>
                  <p>Max Count: {room.maxCount}</p>
                </b>
              </div>
              {/* Amount details */}
              <div>
                <h1>Amount</h1>
                <b>
                  <hr />
                  <p>Total Day: {totalDays}</p>
                  <p>Rent Per Day: {room.rentPerDay}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>
              {/* button */}
              <div className="float-right">
                <StripeCheckout
                  currency="INR"
                  amount={totalAmount}
                  token={onToken}
                  stripeKey="pk_test_51NgWA8SD1kf6cpk3KuKGvt9EkYicddCZ5eOurqFJPvNGSaTpKkwp9I2n882ptBDDuRAdHIEFNmbjEZ6thwPnXWpt00l8tLyBbx"
                >
                  <button className="bg-black text-white font-semibold py-1.5 px-4 rounded">
                    Pay Now
                  </button>
                </StripeCheckout>
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
