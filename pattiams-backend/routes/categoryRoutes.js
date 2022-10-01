import express from "express";

const router = express.Router();

import { getCategories, getSubCategories } from '../controllers/categoryController.js';

router.route("/").get(getCategories);

router.route("/subcategories").get(getSubCategories);

export default router;