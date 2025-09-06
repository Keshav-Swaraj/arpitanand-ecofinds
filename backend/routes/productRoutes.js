import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

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

// Route for uploading images only
router.post("/upload", protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    res.json({ 
      message: 'Image uploaded successfully',
      imageUrl: req.file.path 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

router.post("/", protect, upload.single('image'), async (req, res) => {
  try {
    console.log('Product creation request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User:', req.user);
    
    const { title, description, category, price } = req.body;
    
    // Get image URL from Cloudinary if file was uploaded, otherwise use URL from body
    let image = req.body.image || '';
    
    if (req.file) {
      console.log('File uploaded, using Cloudinary URL:', req.file.path);
      image = req.file.path;
    } else {
      console.log('No file uploaded, using provided URL:', image);
    }
    
    const product = new Product({ 
      ownerId: req.user._id, 
      title, 
      description, 
      category, 
      price: parseFloat(price), 
      image 
    });
    
    console.log('Saving product:', product);
    await product.save();
    console.log('Product saved successfully');
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
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
