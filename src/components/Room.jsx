import Image from "next/image";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRoomContext } from "@/hooks/context";

const Room = ({ room }) => {
  const [open, setOpen] = useState(false);
  const { fromDate, toDate } = useRoomContext();

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-row">
      <div className="md:w-1/3">
        <Image src={room.imageUrls[0]} alt="image" width={200} height={100} />
      </div>
      <div className="md:col-span-7">
        <h1 className=" text-xl">{room.name}</h1>
        <p>Max Count: {room.maxCount}</p>
        <p>Phone Number: {room.phoneNumber}</p>
        <p>Type: {room.type}</p>

        <div className="float-right">
          {fromDate && toDate && (
            <Link
              href={`/book/${room._id}`}
              className="bg-black text-white font-semibold py-2 px-4 rounded"
            >
              Book Now
            </Link>
          )}
          <button
            onClick={handleOpen}
            className="bg-black text-white font-semibold py-2 px-4 rounded"
          >
            View Details
          </button>
        </div>
      </div>
      {/* Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{room.name}</DialogHeader>
        <DialogBody divider>
          <Carousel className="rounded-xl" prevArrow="" nextArrow="">
            {room.imageUrls.map((r) => {
              return (
                <Image
                  key={r}
                  src={r}
                  alt="image 3"
                  className="h-full w-full object-cover"
                  width={200}
                  height={150}
                />
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Room;
