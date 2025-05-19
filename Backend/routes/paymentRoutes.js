import express from 'express';
import Razorpay from 'razorpay';
import Order from '../models/Order.js'; 

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      status: razorpayOrder.status,
    });

    await order.save();

    res.json(razorpayOrder);
  } catch (err) {
    console.error("❌ Razorpay order error:", err);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

export default router;
