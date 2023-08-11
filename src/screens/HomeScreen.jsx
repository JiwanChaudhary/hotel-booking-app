"use client";

import Room from "@/components/Room";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const HomeScreen = () => {
  const [room, setRoom] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const getAllRooms = async () => {
    try {
      const response = await axios.get(`/api/rooms`);
      const { data } = response;
      setRoom(data.room);
      // console.log(data);
      // console.log(response.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div className="lex items-center justify-center gap-5">
      {/* <p>HomeScreen</p> */}
      {room.map((r) => (
        <>
          <div className="bg-white rounded-lg shadow-md p-8 flex">
            <div>
              <Image
                src={r.imageUrls[0]}
                alt={r.name}
                width={200}
                height={150}
                className="rounded-full"
              />
            </div>
            <div className="w-2/3 pl-8">
              <p>{r.name}</p>
              <p>Max Count: {r.maxCount}</p>
              <p>Phone Number: {r.phoneNumber}</p>
              <p>Type: {r.type}</p>
              <button onClick={handleOpen}>View Details</button>
            </div>
            {/* modal */}
            <>
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{r.name}</DialogHeader>
                <DialogBody divider>
                  <Image
                    src={r.imageUrls[1]}
                    alt={r.name}
                    width={200}
                    height={150}
                    className="rounded-full"
                  />
                  The key to more success is to have a lot of pillows. Put it
                  this way, it took me twenty five years to get these plants,
                  twenty five years of blood sweat and tears, and I&apos;m never
                  giving up, I&apos;m just getting started. I&apos;m up to
                  something. Fan luv.
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </>
          </div>
        </>
      ))}
    </div>
  );
};

export default HomeScreen;
