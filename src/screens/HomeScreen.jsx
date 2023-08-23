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
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  const getAllRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rooms`);
      const { data } = response;
      setRooms(data.room);
      setDuplicateRooms(data.room);
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
    const formattedFromDate = moment(dates[0]).format("DD-MM-YYYY");
    const formattedToDate = moment(dates[1]).format("DD-MM-YYYY");

    setFromDate(formattedFromDate);
    setToDate(formattedToDate);

    let tempRooms = [];
    let availability = false;

    for (const room of duplicateRooms) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentBookings.length == 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  }

  // search room by keyword
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }

  // search room by type
  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <>
      <div className="container">
        <div className="container px-2 py-2 flex flex-row gap-5">
          <div className="col-span-0 w-15">
            <Space direction="vertical" size={5}>
              <RangePicker format="DD-MM-YYYY" onChange={handleDate} />
            </Space>
          </div>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="search rooms"
              className="border border-black rounded px-4 py-2"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>
          <select
            className="border border-black rounded px-4 py-2"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="non-deluxe">Non-Deluxe</option>
          </select>
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
            <>
              <h1>No Rooms of name: {searchKey}</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
