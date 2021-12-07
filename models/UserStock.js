const mongoose = require("mongoose");

const UserStockSchema = mongoose.Schema({
  user: {
    type: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    required: true,
  },

  stock: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        items: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("userStock", UserStockSchema);
