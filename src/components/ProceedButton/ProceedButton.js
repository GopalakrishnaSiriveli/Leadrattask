import React from "react";
import axios from "axios";

const ProceedButton = ({ selectedSeats, onBookingComplete }) => {
  const handleProceed = () => {
    axios
      .post("/api/bookseats", { seatsToBook: selectedSeats })
      .then((response) => {
        onBookingComplete();
      })
      .catch((error) => {
        console.error("Error booking seats:", error);
      });
  };

  return (
    <div className="proceed-button">
      <button onClick={handleProceed} disabled={selectedSeats.length === 0}>
        Proceed
      </button>
    </div>
  );
};

export default ProceedButton;
