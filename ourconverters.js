// index.js (Backend Entry Point)

const express = require("express");
const path = require("path");
const cors = require("cors");
const converters = require("./group6fomula.js"); // your conversion formulas

const app = express();
const PORT = 3000;

// Enable CORS (so frontend can fetch)
app.use(cors());

// Serve static frontend files if you have any (index.html, etc.)
// Example: put frontend files inside "frontend" folder
app.use(express.static(path.join(__dirname, "frontend")));

// API endpoint for conversion
app.get("/convert", (req, res) => {
  const { value, type } = req.query;

  if (!value || !type) {
    return res.status(400).json({ error: "Please provide value and type" });
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return res.status(400).json({ error: "Value must be a number" });
  }

  const converterFn = converters[type];
  if (!converterFn) {
    return res.status(400).json({ error: "Invalid conversion type" });
  }

  const result = converterFn(numValue);
  res.json({
    input: numValue,
    conversion: type,
    result,
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome! Example: /convert?value=100&type=kmToMiles");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
