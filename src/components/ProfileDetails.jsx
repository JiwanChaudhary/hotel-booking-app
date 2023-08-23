import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ProfileDetails = () => {
  const params = useParams();
  const id = params;
  console.log(id);

  async function getUserDetails() {
    try {
      const res = await axios.get(`/api/users/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>ProfileDetails</div>
      <button onClick={getUserDetails}>Get</button>
    </>
  );
};

export default ProfileDetails;
