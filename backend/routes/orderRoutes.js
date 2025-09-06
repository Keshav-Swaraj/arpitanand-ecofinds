import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const order = new Order({ userId: req.user._id, items: req.body.items });
  await order.save();
  res.json(order);
});

router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).populate("items.productId", "title price");
  res.json(orders);
});

export default router;
