import React, { useState } from "react";

const Seat = ({ seatData, onSeatClick }) => {
  const { seatNumber, seatType, isBooked } = seatData;

  const handleClick = () => {
    if (!isBooked) {
      onSeatClick(seatNumber);
    }
  };

  return (
    <div className={`seat ${isBooked ? "booked" : ""}`} onClick={handleClick}>
      {seatNumber} - {seatType}
    </div>
  );
};

export default Seat;
