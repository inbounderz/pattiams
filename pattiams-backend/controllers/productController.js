import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Subcategory from "../models/subcategoryModel.js";

// GET ALL PRODUCTS
// @router '/api/products'
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.json(products);
  }
});

// GET PRODUCTS BY ID
// @router '/api/products/:id'
// @access public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// GET PRODUCTS BY CATEGORY
// @router '/api/products/:cat'
// @access public
const getProductsByCategory = asyncHandler(async (req, res) => {

  const products = await Product.find({ category: req.params.cat });

  if (products) {
    res.json({ products});
  } else {
    res.status(404);
    throw new Error("Products not found with this category name.");
  }
});

// POST CREATE NEW REVIEW
// @router '/api/products/:id/reviews
// @access private(***doubt***)
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DELETE PRODUCTS BY ID
// @router '/api/products/:id'
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// POST CREATE PRODUCTS
// @router '/api/products'
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product Name",
    image: "images/sample.jpeg",
    category: "Category",
    subCategory: "Sub Category",
    countInStock: 0,
    description: "Description",
    benefits: "Benefits",
    ingredients: "Ingredients",
    howToUse: "How to use",
    variant: [],
    user: req.user._id,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// PUT(UPDATE) PRODUCTS BY ID
// @router '/api/products/:id'
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    subCategory,
    countInStock,
    description,
    benefits,
    ingredients,
    howToUse,
    variant,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.category = category;
    product.subCategory = subCategory;
    product.countInStock = countInStock;
    product.description = description;
    product.benefits = benefits;
    product.ingredients = ingredients;
    product.howToUse = howToUse;
    product.variant = variant;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

// GET TOP RATED PRODUCTS
// @router '/api/products/top'
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);

  res.json(products);
});

// GET AYURVEDIC PRODUCTS BASED ON CATEGORY
// @router '/api/products/ayurveda/:cat'
// @access public
const getAyurvedicProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({category: "ayurveda", categoryslug: req.params.cat});
  
  if(products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductsById,
  getProductsByCategory,
  createProductReview,
  deleteProduct,
  updateProduct,
  createProduct,
  getTopProducts,
  getAyurvedicProducts,
};