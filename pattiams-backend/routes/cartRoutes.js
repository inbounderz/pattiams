import express from "express";

const router = express.Router();

import { createCart, deleteCartItem, getCartItems } from '../controllers/cartController.js';
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createCart);

router.route("/").get(protect, getCartItems);

router.route("/:id").delete(protect, deleteCartItem);


export default router;