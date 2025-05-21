// routes/purchaseRoutes.js
import express from "express";
import PurchasedProject from "../models/PurchasedProject.js";
import { Project } from "../models/Project.js";
import Mapping from "../models/Mapping.js";

const router = express.Router();

router.post("/store", async (req, res) => {
  try {
    const { username, email, projectId, paymentId } = req.body;

    // 1. Fetch project details
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // 2. Fetch Drive URL from mapping
    const mapping = await Mapping.findOne({ projectId });
    if (!mapping) return res.status(404).json({ message: "Drive URL mapping not found" });

    // 3. Calculate price with discount if available
    const pricePaid =
      project.price - (project.price * (project.discountPercentage || 0)) / 100;

    // 4. Store purchase
    const newPurchase = new PurchasedProject({
      username,
      email,
      projectId,
      projectTitle: project.title,
      pricePaid,
      driveUrl: mapping.url, 
      paymentId,
    });

    await newPurchase.save();

    res.status(200).json({
      message: "Purchase stored successfully",
      driveUrl: mapping.url,
    });
  } catch (error) {
    console.error("Error in purchase route:", error);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

// ✅ GET all purchased projects for a specific user by email
router.get("/user/:email", async (req, res) => {
    try {
      const { email } = req.params;
  
      const purchases = await PurchasedProject.find({ email })
        .populate("projectId") // brings in full project data
        .sort({ createdAt: -1 });
  
      res.status(200).json(purchases);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch purchased projects", details: err.message });
    }
  });

export default router;
