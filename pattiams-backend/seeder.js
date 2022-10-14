import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import categories from './data/category.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';
import subCategories from "./data/subCategories.js";
import Subcategories from "./models/subcategoryModel.js";
import CartItem from "./models/cartModel.js";
import cart from './data/cart.js';
import otp from './data/otp.js';
import Otp from "./models/otpModel.js";

dotenv.config();

connectDB();

const importData = async ()=> {
    try {
        
        // await Order.deleteMany();
        // await Product.deleteMany();
        // await User.deleteMany();
        // await Category.deleteMany();
        // await CartItem.deleteMany();

        // const user = await User.findOne({admin: true});
        // const sampleCartItems = await cart.map(car => {
        //     return { ...car, user: user }
        // })
        // await CartItem.insertMany(sampleCartItems);

        // const createdUsers = await User.insertMany(users);
        // const adminUser = await createdUsers[0]._id;

        // const sampleProducts = await products.map(product => {
        //     return { ...product, user: adminUser }
        // })

        // const sampleCategories = await categories.map(category => {
        //     return { ...category, user: adminUser }
        // })

        // const sampleSubCategories = await subCategories.map((subCategory) => {
        //     return { ...subCategory, user: adminUser }
        // })

        // await Product.insertMany(sampleProducts)
        // await Category.insertMany(sampleCategories)
        // await Subcategories.insertMany(sampleSubCategories)

        // const sampleOtp = await otp.map((ot) => {
        //     return { ...ot }
        // })

        // await Otp.insertMany(sampleOtp);

        console.log("Data imported!");
        process.exit()
        
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);   
    }
}

const destroyData = async ()=> {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log("Data destroyed!");
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);   
    }
}

if(process.argv[2]=== '-d'){
    destroyData();
}else{
    importData();
}