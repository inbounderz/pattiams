import path from 'path';
import express, { application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { nanoid } from 'nanoid';
import Razorpay from 'razorpay';
import Order from './models/orderModel.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Importing routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);

// Razorpay integration
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const getOrder = async (id) => {
  const data = Order.findById(id).populate('user', 'name email')
  return data
}

app.post('/razorpay/:id', async (req,res)=>{
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  const payment_capture = 1
  const currency = 'INR'
  const options = {
    amount: parseInt(order.totalPrice)*100,
    currency,
    receipt: nanoid(10),
    payment_capture,
  }

  try {
    const response = await razorpay.orders.create(options)
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/razorpay/success/:id', async (req, res) => {
  const order = await getOrder(req.params.id)
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  res.status(200).json('success')
})

// Upload folder is not going to be accessible by default. So, we have to make it static.
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/pattiams-frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "pattiams-frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

//Step 2: Heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Your server is running in ${process.env.NODE_ENV} mode`);
});