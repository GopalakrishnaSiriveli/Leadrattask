import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import axios from "axios";

const SeatingLayout = ({ onSeatSelection }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios
      .get("/api/seats")
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seats:", error);
      });
  }, []);

  const handleSeatClick = (selectedSeatNumber) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.seatNumber === selectedSeatNumber) {
        return { ...seat, isBooked: true };
      }
      return seat;
    });
    setSeats(updatedSeats);
    onSeatSelection(selectedSeatNumber);
  };

  return (
    <div className="seating-layout">
      {seats.map((seat) => (
        <Seat
          key={seat.seatNumber}
          seatData={seat}
          onSeatClick={handleSeatClick}
        />
      ))}
    </div>
  );
};

export default SeatingLayout;
