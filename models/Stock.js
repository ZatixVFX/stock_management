const mongoose = require("mongoose");

const StockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    days_of_discount: {
      type: [
        {
          day: {
            type: String,
            required: true,
          },
          discount_percentage: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    promo_codes: {
      type: [
        {
          code: {
            type: String,
            required: true,
          },
          discount_amount: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    collection: "stock",
  }
);

module.exports = mongoose.model("", StockSchema);
