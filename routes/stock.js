const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const Stock = require("../models/Stock");

// @router GET api/stock
// @desc Get product stock
// @access Public
router.get("/", async (req, res) => {
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (err) {
    console.error(err.message), res.status(500).send("Server Error");
  }
});

module.exports = router;
