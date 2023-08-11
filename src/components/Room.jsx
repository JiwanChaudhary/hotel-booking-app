import Image from "next/image";
import React, { useEffect, useState } from "react";

const Room = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="lex items-center justify-center h-screen">
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
              <p>{r.name}</p> <p>Max Count: {r.maxCount}</p>
              <p>Phone Number: {r.phoneNumber}</p>
              <p>Type: {r.type}</p>
            </div>
            <button type="button" onClick={openModal}>
              View Details
            </button>
          </div>
          {/* modal */}
          <div className="flex justify-center items-center h-screen">
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 ${
                isModalOpen ? "" : "hidden"
              }`}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-4">Modal Content</h2>
                <p>This is the content of the modal.</p>
                <button
                  className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Close Modal
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Room;
