import { createOrder, createTransaction, getOrderByUserId } from "../controllers/order.js";
import express from "express"


const router = express.Router()

router.post("/transaction", createTransaction);
router.get("/:userID", getOrderByUserId);
router.post("/", createOrder)

export default router