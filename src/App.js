import React, { useState, useEffect } from "react";
import SeatingLayout from "./SeatingLayout";

const App = () => {
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Simulate fetching seat data from your backend or other logic.
    const fetchData = async () => {
      try {
        const response = await fetch("/api/seats");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSeatsData(data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeatClick = (seatNumber) => {
    // Toggle seat selection.
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="app">
      <h1>Book My Seat</h1>
      <SeatingLayout seatsData={seatsData} onSeatClick={handleSeatClick} />
      <div className="selected-seats">
        <h2>Selected Seats:</h2>
        <ul>
          {selectedSeats.map((seatNumber) => (
            <li key={seatNumber}>{seatNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
