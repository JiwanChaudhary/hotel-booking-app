"use client";

import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ProfileDetails from "@/components/ProfileDetails";

const ProfileScreen = () => {
  return (
    <div>
      <Tabs value="html">
        <TabsHeader>
          <Tab key={1} value="profile">
            Profile
          </Tab>
          <Tab key={2} value="bookings">
            Bookings
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={1} value="profile">
            <ProfileDetails />
          </TabPanel>

          <TabPanel key={2} value="bookings">
            <h1>My Bookings</h1>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
