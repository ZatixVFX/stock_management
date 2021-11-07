const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Stock = require("../models/Stock");
const UserStock = require("../models/UserStock");

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

// @router POST api/stock
// @desc add stock to user's account
// @access Public
router.post(
  "/",
  [
    auth,
    [
      check("name", "Product name is required").not().isEmpty(),
      check("items", "Number of items of the product is required")
        .not()
        .isEmpty(),
      check("price", "Price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, items, price } = req.body;

    try {
      let getUserStock = await UserStock.find({ user: req.user.id });

      if (getUserStock.length > 0)
        res.status(401).json({ msg: "You already have stock collection" });
      else {
        const newStock = new UserStock({
          user: req.user.id,
          stock: [
            {
              name,
              items,
              price,
            },
          ],
        });

        const stock = await newStock.save();

        res.json(stock);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router PUT api/stock
// @desc add stock to user's account
// @access Public
router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Product name is required").not().isEmpty(),
      check("items", "Number of items of the product is required")
        .not()
        .isEmpty(),
      check("price", "Price is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, items, price } = req.body;
    try {
      let userStock = await UserStock.findById(req.params.id);
      if (!userStock) {
        res.status(404).json({ msg: "No stock collection found" });
      } else if (userStock.stock.length >= 3) {
        res.status(401).json({ msg: "Max stock array length is 3" });
      } else if (userStock.user.toString() !== req.user.id) {
        res.status(401).json({
          msg: "You are not authorized to add stock to this user account",
        });
      } else {
        let newStock = {
          name,
          items,
          price,
        };
        let updatedStock = {};
        updatedStock = await UserStock.findByIdAndUpdate(req.params.id, {
          $push: { stock: newStock },
        });

        res.json({ msg: "New Stock added", updatedStock });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router DELETE api/stock
// @desc delete stock from user's account
// @access Public
router.delete("/:id", auth, async (req, res) => {
  try {
    let stock = await UserStock.find({
      stock: { $elemMatch: { _id: req.params.id } },
    });

    if (stock.length > 0) {
      if (stock[0].user.toString() !== req.user.id) {
        res
          .status(401)
          .json({ msg: "You are not authorized to delete this user stock" });
      } else {
        await UserStock.findByIdAndUpdate(
          stock[0]._id,
          {
            $pull: { stock: { _id: req.params.id } },
          },
          { multi: true }
        );
        res.json({ msg: "Stock removed" });
      }
    } else {
      res.status(404).json({ msg: "Stock not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
