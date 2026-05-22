const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
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

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn(
    "⚠️  EMAIL_USER or EMAIL_PASS not set — confirmation emails will be skipped."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || "").replace(/\s/g, ""),
  },
});

// Fire-and-forget email helper. Never blocks the HTTP response.
function sendAppointmentEmails({ name, email, phone, date, department, message }) {
  // Hospital notification
  transporter
    .sendMail({
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
    })
    .then(() => console.log("Hospital email sent!"))
    .catch((err) => console.error("Hospital email error:", err.message));

  // Patient confirmation
  transporter
    .sendMail({
      from: `"New Ikeja Hospital" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Appointment Confirmation - New Ikeja Hospital",
      html: `
        <h2>Appointment Confirmed!</h2>
        <p>Dear ${name}, your appointment has been received and our team will reach out shortly to confirm your slot.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p>📍 13 Gbajobi Street, Allen, Ikeja, Lagos</p>
        <p>📞 0814 430 7147</p>
      `,
    })
    .then(() => console.log("Patient email sent!"))
    .catch((err) => console.error("Patient email error:", err.message));
}

app.post("/appointment", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();
    console.log("Saved successfully!");

    // Respond immediately so the client never waits on SMTP.
    res.json({ message: "Appointment booked successfully!" });

    // Send confirmations in the background; failures are logged but do not affect the API response.
    sendAppointmentEmails(req.body);
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