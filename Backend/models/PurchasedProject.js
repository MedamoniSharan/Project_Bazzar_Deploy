// models/PurchasedProject.js
import mongoose from "mongoose";

const purchasedProjectSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    projectTitle: { type: String, required: true },
    pricePaid: { type: Number, required: true },
    driveUrl: { type: String, required: true },
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PurchasedProject", purchasedProjectSchema);
