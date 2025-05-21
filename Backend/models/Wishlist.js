// models/Wishlist.js
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  email: { type: String, required: true }, // ✅ using email instead of userId
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
}, { timestamps: true });

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
