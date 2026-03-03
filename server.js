const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({ origin: ["http://localhost:5175", "http://127.0.0.1:5175"] }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  department: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

app.post("/appointment", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();
    console.log("Saved successfully!");
    res.json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Save error:", error.message);
    res.status(500).json({ message: "Error saving appointment" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
