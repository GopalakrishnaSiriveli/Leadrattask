// backend/server.js
const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const db = new sqlite3.Database("./seats.db");

app.use(bodyParser.json());

// Create a table to store seat information
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS seats (id INTEGER PRIMARY KEY AUTOINCREMENT, seatNumber TEXT, seatType TEXT, isBooked BOOLEAN)"
  );
});

// API to fetch all available seats
app.get("/api/seats", (req, res) => {
  db.all("SELECT * FROM seats WHERE isBooked = 0", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API to book selected seats
app.post("/api/bookseats", (req, res) => {
  const { seatsToBook } = req.body;
  if (!seatsToBook || !Array.isArray(seatsToBook)) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const placeholders = seatsToBook.map(() => "(?)").join(",");
  db.run(
    `UPDATE seats SET isBooked = 1 WHERE seatNumber IN (${placeholders})`,
    seatsToBook,
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Seats booked successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
