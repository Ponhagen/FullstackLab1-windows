const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_URL;

// Middleware to read JSON-data
app.use(express.json());

// Test to read from database
app.get("api/dishes", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







// Connection to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Ansluten till MongoDB");
    app.listen(PORT, () => {
      console.log(`Servern körs på http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Fel vid anslutning till databasen:", err.message);
  });