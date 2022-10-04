import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// POST - CREATE NEW ORDERS
// @router POST '/api/orders'
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  }
});

// GET - ORDER BY ID
// @router GET '/api/orders/:id'
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

});

// UPDATE - UPDATE ORDER TO PAID
// @router GET '/api/orders/:id/pay'
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// UPDATE - UPDATE ORDER TO SHIPPED
// @router GET '/api/orders/:id/ship'
// @access Private:admin
const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if(order.isPaid) {

      order.isShipped = true;

      order.shippedAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);

    } else {
      res.status(404);
      throw new Error("Amount not paid");
    }


  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// UPDATE - UPDATE ORDER TO DELIVERED
// @router GET '/api/orders/:id/deliver'
// @access Private:admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if(order.isPaid) {

      order.isDelivered = true;

      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);

    } else {
      res.status(404);
      throw new Error("Amount not paid");
    }


  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// GET - My Orders
// @router GET '/api/orders/myorders'
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// GET - ALL ORDERS
// @router GET '/api/orders'
// @access ADMIN
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getOrders, getMyOrders, updateOrderToDelivered, updateOrderToShipped };