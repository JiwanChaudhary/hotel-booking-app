"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Room from "@/components/Room";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";
import { useRoomContext } from "@/hooks/context";
import "antd/dist/antd.css";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { setFromDate, setToDate } = useRoomContext();

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

  function handleDate(dates) {
    if (dates.length >= 2) {
      const formattedFromDate = moment(dates[0]).format("DD-MM-YYYY");
      const formattedToDate = moment(dates[1]).format("DD-MM-YYYY");

      setFromDate(formattedFromDate);
      setToDate(formattedToDate);
    }
  }

  return (
    <>
      <div className="container">
        <div className="container px-2 py-2">
          <div className="col-span-9">
            <Space direction="vertical" size={5}>
              <RangePicker format="DD-MM-YYYY" onChange={handleDate} />
            </Space>
          </div>
        </div>

        <div className="flex flex-col justify-center m-auto">
          {loading ? (
            <Loader />
          ) : rooms.length > 0 ? (
            rooms.map((room) => {
              return (
                <div key={room._id} className="col-span-9">
                  <Room room={room} />
                </div>
              );
            })
          ) : (
            <Error />
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
