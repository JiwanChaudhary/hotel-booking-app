"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AddRoom = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    maxcount: "",
    phoneNumber: "",
    rentPerDay: "",
    type: "",
    description: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const NewRoom = {
    name: formData.name,
    maxCount: formData.maxcount,
    phoneNumber: formData.phoneNumber,
    rentPerDay: formData.rentPerDay,
    type: formData.type,
    description: formData.description,
    imageUrls: [formData.imageUrl1, formData.imageUrl2, formData.imageUrl3],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/rooms`, NewRoom);
      Swal.fire("Congratulations!", "Room Created Successfully", "success");
      router.refresh();
      router.push("/admin");
    } catch (error) {
      Swal.fire("Sorry!", "Something went Wrong", "error");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>
        <b>Add Room</b>
      </h1>
      <div className="flex justify-center items-center">
        <form
          className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            {/* Name */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Room Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Room Count */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="maxcount"
            >
              Max Count
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="maxcount"
              name="maxcount"
              value={formData.maxcount}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Rent Per Day */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rentPerDay"
            >
              Rent Per Day
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              id="rentPerDay"
              name="rentPerDay"
              value={formData.rentPerDay}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Type */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Image URL 1 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUrl1"
            >
              Image URL 1
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="imageUrl1"
              name="imageUrl1"
              value={formData.imageUrl1}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Image URL 2 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUrl2"
            >
              Image URL 2
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="imageUrl2"
              name="imageUrl2"
              value={formData.imageUrl2}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Image URL 3 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUrl3"
            >
              Image URL 3
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="imageUrl3"
              name="imageUrl3"
              value={formData.imageUrl3}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
