import express from "express";
import {
  customerInfo,
  loginCustomer,
  registerCustomer,
} from "../../controllers/authControllers/customerController.js";
import { placeOrder } from "../../controllers/Orders/OrderController.js";

const router = express.Router();
export { router as customerRouter };

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/info", (req, res) => {
  customerInfo(req, (error, user) => {
    if (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Error retrieving user info" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user object
    res.json(user);
  });
});

router.post("/placeorder", placeOrder);
