import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  projectTitle: { type: String, required: true }, // ✅ Add this line
  url: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Mapping", mappingSchema);

