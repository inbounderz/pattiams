import express from "express";
const router = express.Router();

//Imports from the controller
import { addOrderItems, getOrderById, updateOrderToPaid, getOrders, updateOrderToDelivered, getMyOrders, updateOrderToShipped } from "../controllers/orderController.js";
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/ship').put(protect, admin, updateOrderToShipped);

export default router;