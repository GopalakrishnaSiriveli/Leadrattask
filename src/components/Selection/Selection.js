import React, { useState } from "react";

const Selection = ({ onSeatTypeChange, onSeatCountChange }) => {
  const [selectedType, setSelectedType] = useState("Standard");
  const [selectedCount, setSelectedCount] = useState(1);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onSeatTypeChange(e.target.value);
  };

  const handleCountChange = (e) => {
    setSelectedCount(e.target.value);
    onSeatCountChange(parseInt(e.target.value));
  };

  return (
    <div className="selection">
      <label htmlFor="seatType">Seat Type:</label>
      <select id="seatType" value={selectedType} onChange={handleTypeChange}>
        <option value="Standard">Standard</option>
        <option value="VIP">VIP</option>
      </select>
      <br />
      <label htmlFor="seatCount">Number of Seats:</label>
      <input
        type="number"
        id="seatCount"
        value={selectedCount}
        onChange={handleCountChange}
      />
    </div>
  );
};

export default Selection;
