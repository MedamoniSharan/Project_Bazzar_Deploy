import express from "express";
import { Project } from "../models/Project.js";

const router = express.Router();

// POST /api/projects
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
});

export default router;
