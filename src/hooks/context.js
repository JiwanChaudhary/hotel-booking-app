"use client"

import { useState, useContext, createContext } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const RoomValue = {
        fromDate,
        setFromDate,
        toDate,
        setToDate
    }

    return (
        <RoomContext.Provider value={RoomValue}>{children}</RoomContext.Provider>
    )
}

export const useRoomContext = () => useContext(RoomContext);