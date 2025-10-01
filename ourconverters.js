const express = require("express");
const converters = require("./group6fomula.js");

const app = express();
const PORT = 3000;

console.log("Registration Number: our group 6");
console.log("Check converters object:", converters);

console.log("Available types:", Object.keys(converters));

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

// Home test
app.get("/", (req, res) => {
  res.send("Welcome! Example: /convert?value=100&type=kmToMiles");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
