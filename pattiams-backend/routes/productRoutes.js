import express from "express";

const router = express.Router();

//Imports from the controller
import {
  getProducts,
  getProductsById,
  getProductsByCategory,
  createProductReview,
  deleteProduct,
  updateProduct,
  createProduct,
  getTopProducts,
  getAyurvedicProducts
} from "../controllers/productController.js";

import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
.route("/:id")
.get(getProductsById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct);

router.route("/ayurveda/:cat").get(getAyurvedicProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/category/:cat").get(getProductsByCategory);

export default router;
