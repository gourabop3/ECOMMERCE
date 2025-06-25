const express = require("express");
const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  updatePaymentStatus, // ✅ included here
} = require("../../controllers/admin/order-controller");

const router = express.Router();

// ✅ Routes
router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

// ✅ Add this line if not already present:
router.patch("/payment/:id", updatePaymentStatus);

module.exports = router;