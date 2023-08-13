"use client";

import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Room from "@/components/Room";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

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
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
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
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
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
