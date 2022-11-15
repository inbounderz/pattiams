import asyncHandler from "express-async-handler";
import CartItem from "../models/cartModel.js";
import Product from "../models/productModel.js";

// POST CREATE CART
// @router '/api/cart'
// @access private/user
const createCart = asyncHandler(async (req, res) => {

  const { id, qty, variant, price } = req.body;

  const product = await Product.findById(id);

  if (product) {
    
    const addToCart = await CartItem.create({
      user: req.user._id,
      productId: id,
      productName: product.name,
      productImage: product.image,
      productVariant: product.variant[variant],
      productCategory: product.category,
      qty,
      price,
    });

    if (addToCart) res.status(201).json(addToCart);

  } else {
    res.status(401);
    throw new Error("Some error occured. Try again!");
  }
});

// GET CART ITEMS
// @router '/api/cart/:id'
// @access private/user
const getCartItems = asyncHandler(async (req, res) => {
    
    const cartProducts = await CartItem.find({user: req.user._id});

    if (cartProducts) {
        res.status(200).json(cartProducts);
    } else {
        res.status(401);
        throw new Error("No products found");
    }
})

// REMOVE PRODUCT FROM CART
// @router '/api/cart/:id'
// @access private/user
const deleteCartItem = asyncHandler(async (req, res) => {
  const cartItem = await CartItem.findById(req.params.id);
  if (cartItem) {
    await cartItem.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { createCart, getCartItems, deleteCartItem };