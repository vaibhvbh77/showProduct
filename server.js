// showProduct REST API
// Returns mock product details in JSON format
// Run: node server.js  (listens on port 80 so it works behind the ALB/health check without extra config)

const express = require("express");
const os = require("os");
const app = express();
const PORT = process.env.PORT || 80;

// Mock product data
const products = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 19.99, stock: 150 },
  { id: 2, name: "Mechanical Keyboard", category: "Electronics", price: 79.99, stock: 80 },
  { id: 3, name: "Water Bottle", category: "Lifestyle", price: 12.5, stock: 300 },
  { id: 4, name: "Yoga Mat", category: "Fitness", price: 25.0, stock: 120 },
  { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 45.0, stock: 60 },
];

// Health check endpoint (useful for ALB target group health checks)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", host: os.hostname() });
});

// Main API: return all products
app.get("/showProduct", (req, res) => {
  res.status(200).json({
    servedBy: os.hostname(), // helpful during the demo to prove requests hit different instances
    count: products.length,
    products: products,
  });
});

// Return a single product by ID
app.get("/showProduct/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ servedBy: os.hostname(), product });
});

app.listen(PORT, () => {
  console.log(`showProduct API running on port ${PORT}`);
});
