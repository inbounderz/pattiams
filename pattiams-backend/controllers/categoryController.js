import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";

// GET - CATEGORIES
// @router GET '/api/categories'
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (categories) {
    res.json(categories);
  }
});

// GET SUB-CATEGORIES
// @router '/api/products/subcategories'
// @access public
const getSubCategories = asyncHandler(async (req, res) => {
  const categories = await Subcategory.find({});

  if (categories) {
    res.json(categories);
  } else {
    res.status(401);
    throw new Error("Some error occured");
  }
});

export { getCategories, getSubCategories };
