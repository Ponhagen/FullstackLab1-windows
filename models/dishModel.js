const mongoose = require("mongoose");
const { type } = require("os");
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    preperationSteps: {
        type: [String],
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        default: "medium"
    },
    });

    const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;