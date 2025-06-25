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
  orderStatus: {
    type: String,
    enum: ["pending", "inProcess", "inShipping", "delivered", "rejected"],
    default: "pending", // ✅ default + enum added
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"], // ✅ enum added
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