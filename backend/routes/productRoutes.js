import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

router.post("/", protect, async (req, res) => {
  const { title, description, category, price, image } = req.body;
  const product = new Product({ ownerId: req.user._id, title, description, category, price, image });
  await product.save();
  res.json(product);
});

router.put("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  if (product.ownerId.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

router.delete("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  if (product.ownerId.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });

  await product.remove();
  res.json({ message: "Deleted" });
});

export default router;
