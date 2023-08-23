import ProfileScreen from "@/screens/ProfileScreen";
import React from "react";

const page = ({ params }) => {
  const { id } = params;
  // console.log(id);
  return (
    <>
      <ProfileScreen id={id} />
    </>
  );
};

export default page;
