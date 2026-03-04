const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors({ origin: ["http://localhost:5175", "https://new-ikeja-hospital.vercel.app"] }));
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
  },
});

app.post("/appointment", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();
    console.log("Saved successfully!");

    const { name, email, phone, date, department, message } = req.body;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Appointment - ${name}`,
        html: `
          <h2>New Appointment Booked</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Department:</strong> ${department}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log("Hospital email sent!");
    } catch (emailError) {
      console.error("Hospital email error:", emailError.message);
    }

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Appointment Confirmation - New Ikeja Hospital",
        html: `
          <h2>Appointment Confirmed!</h2>
          <p>Dear ${name}, your appointment has been booked.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Department:</strong> ${department}</p>
          <p>📍 13 Gbajobi Street, Allen, Ikeja, Lagos</p>
          <p>📞 0814 430 7147</p>
        `,
      });
      console.log("Patient email sent!");
    } catch (emailError) {
      console.error("Patient email error:", emailError.message);
    }

    res.json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Error saving appointment" });
  }
});

app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});