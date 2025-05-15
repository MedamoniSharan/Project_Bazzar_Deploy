import express from "express";
import { Project } from "../models/Project.js";

const router = express.Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 */
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

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Fully update a project
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
});

/**
 * @route   PATCH /api/projects/:id
 * @desc    Partially update a project
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error patching project:", error);
    res.status(500).json({ message: "Failed to patch project" });
  }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

export default router;
