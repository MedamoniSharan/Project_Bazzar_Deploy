import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "./models/User.js";


import projectRoutes from "./routes/projectRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // 👈

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Multer (File Upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 10,
  },
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Google OAuth Login Route
app.post("/api/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // 🔍 Check if user exists, else create
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }

    // ✅ Generate JWT with user ID
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token: accessToken, user });
  } catch (error) {
    console.error("❌ Google login failed:", error);
    res.status(401).json({ error: "Invalid Google token" });
  }
});


// 📧 Nodemailer Email with Attachment
app.post("/send-email", upload.fields([
  { name: "images", maxCount: 5 },
  { name: "documents", maxCount: 5 },
]), async (req, res) => {
  const { name, email, phone, projectName, description } = req.body;

  if (!name || !email || !projectName || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mychatswebsite@gmail.com",
      pass: "hion jzxf rccd mchq",
    },
  });

  const mailOptions = {
    from: '"Contact Form" <mychatswebsite@gmail.com>',
    to: "studentprojectbazaar@gmail.com",
    subject: `New Project Request from ${name}`,
    text: `
Full Name: ${name}
Email: ${email}
Phone: ${phone}
Project Title: ${projectName}
Description: ${description}
    `,
    attachments: [
      ...(req.files?.images || []).map((file) => ({
        filename: file.originalname,
        content: file.buffer,
      })),
      ...(req.files?.documents || []).map((file) => ({
        filename: file.originalname,
        content: file.buffer,
      })),
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
