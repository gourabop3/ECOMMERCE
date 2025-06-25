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
    default: "pending", // ✅ default added
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: "pending", // ✅ default added
  },
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now, // ✅ optional
  },
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

module.exports = mongoose.model("Order", OrderSchema);