// index.js (Backend Entry Point)
//uche this comment will help you

const express = require("express");
const path = require("path");
const cors = require("cors");
const converters = require("./group6fomula.js"); // your conversion formulas

const app = express();
const PORT = process.env.PORT || 3000;

// the will wake our CORS (so frontend can fetch)
app.use(cors({ origin: "*" }));

// Serve static frontend files if you have any (index.html, etc.)
//how far uche this one na the main thing oo
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
