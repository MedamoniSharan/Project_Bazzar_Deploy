import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  techStack: [{ type: String }],
  domain: { type: String, required: true },
  images: [{ type: String, default: ["placeholder.svg"] }],
  videos: [{ type: String }],
  featured: { type: Boolean, default: false },
  soldCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema);
