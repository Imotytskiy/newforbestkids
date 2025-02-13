import express from "express";

import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";

import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/status", adminAuth, placeOrder);

//payment

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, updateStatus);

//User feature

orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
