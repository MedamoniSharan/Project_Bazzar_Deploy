import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  razorpayOrderId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  receipt: String,
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
