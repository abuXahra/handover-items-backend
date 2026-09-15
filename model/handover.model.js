const mongoose = require("mongoose");

const handoverSchema = new mongoose.Schema(
  {
    handoverTo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    handoverTitle: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    handoverItems: [
      {
        title: {
          type: String,
          required: true,
          minlength: 3,
          maxlength: 100,
          trim: true,
        },

        price: {
          type: Number,
          required: true,
          min: 1,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        amount: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    handoverSite: {
      type: String,
      required: true,
      trim: true,
    },

    handoverDate: {
      type: Date,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HandOver", handoverSchema);
