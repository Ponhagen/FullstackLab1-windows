const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Dish = require("./models/dishModel");

const app = express();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_URL;

// Middleware to read JSON-data
app.use(express.json());
app.use(express.static('public'));

// Test to read from database
app.get("/api/dishes", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a single dish by ID

app.get("/api/dishes/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Rätt hittades inte" });
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST request to create a new dish
app.post("/api/dishes", async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT request to update a dish by ID
app.put("/api/dishes/:id", async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDish) return res.status(404).json({ message: "Rätten hittades inte." });
    res.json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE request to delete a dish by ID
app.delete("/api/dishes/:id", async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) return res.status(404).json({ message: "Rätten hittades inte." });
    res.json({ message: "Rätten har tagits bort." });
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