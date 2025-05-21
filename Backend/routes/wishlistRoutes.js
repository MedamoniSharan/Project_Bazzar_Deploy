// routes/wishlistRoutes.js
import express from "express";
import { Wishlist } from "../models/Wishlist.js";
import { Project } from "../models/Project.js";

const router = express.Router();

// ✅ Toggle wishlist based on email
router.post("/toggle", async (req, res) => {
  const { email, projectId } = req.body;

  try {
    const existing = await Wishlist.findOne({ email, projectId });

    if (existing) {
      await existing.deleteOne();
      return res.json({ status: "removed" });
    }

    const newEntry = new Wishlist({ email, projectId });
    await newEntry.save();
    res.json({ status: "added" });
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    res.status(500).json({ error: "Failed to toggle wishlist" });
  }
});

// ✅ Get all favorites for a user by email
router.get("/:email", async (req, res) => {
  try {
    const items = await Wishlist.find({ email: req.params.email }).populate("projectId");
    res.json(items.map(entry => entry.projectId));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

export default router;
