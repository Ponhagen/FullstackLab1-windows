const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_URL;

// Middleware to read JSON-data
app.use(express.json());







// Connection to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Ansluten till MongoDB");
    app.listen(port, () => {
      console.log(`Servern körs på http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Fel vid anslutning till databasen:", err.message);
  });