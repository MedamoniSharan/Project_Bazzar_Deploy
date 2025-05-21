// mappingRoutes.js
import express from "express";
import Mapping from "../models/Mapping.js";
import { Project } from "../models/Project.js"; // Make sure this is imported

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const mappings = await Mapping.find().sort({ createdAt: -1 });
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { projectId, url } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const mapping = new Mapping({
      projectId,
      projectTitle: project.title, // ✅ Add this
      url,
    });
    await mapping.save();
    res.json(mapping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { projectId, url } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const mapping = await Mapping.findByIdAndUpdate(
      req.params.id,
      {
        projectId,
        projectTitle: project.title, // ✅ Add this
        url,
      },
      { new: true }
    );
    res.json(mapping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Mapping.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
