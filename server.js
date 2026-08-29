// showProduct REST API
// Returns mock product details in JSON format
// Run: node server.js  (listens on port 80)

const express = require("express");
const crypto = require("crypto");
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

// Simulates realistic CPU work (e.g. hashing/validation a real API might do)
// so that load testing produces a genuine, demonstrable CPU spike.
// Tune ITERATIONS up/down to control how much CPU each request burns.
function simulateWork() {
  const ITERATIONS = 20000;
  let hash = "seed";
  for (let i = 0; i < ITERATIONS; i++) {
    hash = crypto.createHash("sha256").update(hash + i).digest("hex");
  }
  return hash;
}

// Health check endpoint (kept lightweight on purpose, for fast LB/MIG health checks)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", host: os.hostname() });
});

// Main API: return all products
app.get("/showProduct", (req, res) => {
  simulateWork(); // artificial CPU load per request
  res.status(200).json({
    servedBy: os.hostname(),
    count: products.length,
    products: products,
  });
});

// Return a single product by ID
app.get("/showProduct/:id", (req, res) => {
  simulateWork();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ servedBy: os.hostname(), product });
});

app.listen(PORT, () => {
  console.log(`showProduct API running on port ${PORT}`);
});
