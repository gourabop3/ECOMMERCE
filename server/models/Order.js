const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },

  // ✅ Add default and enum for orderStatus
  orderStatus: {
    type: String,
    enum: ["pending", "inProcess", "inShipping", "delivered", "rejected"],
    default: "pending",
  },

  // ✅ Add default and enum for paymentStatus
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI"],
    default: "COD",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },

  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);