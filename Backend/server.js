import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import nodemailer from "nodemailer";
import multer from "multer";
import paymentRoutes from './routes/paymentRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 10,
  },
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/projects", projectRoutes);
app.use('/api/payments', paymentRoutes);


// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mychatswebsite@gmail.com",
    pass: "hion jzxf rccd mchq",
  },
});

// Handle contact form submission with file upload
app.post("/send-email", upload.fields([
  { name: "images", maxCount: 5 },
  { name: "documents", maxCount: 5 },
]), async (req, res) => {
  const { name, email, phone, projectName, description } = req.body;

  if (!name || !email || !projectName || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log("Received fields:", req.body);
  console.log("Received files:", req.files);
  const mymail="studentprojectbazaar@gmail.com"
  const mailOptions = {
    from: '"Contact Form" <mychatswebsite@gmail.com>',
    to: mymail,
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
