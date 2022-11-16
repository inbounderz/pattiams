import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import { mail } from '../config/mailer.js';

// AUTH USER AND GET TOKEN
// @router '/api/users/login'
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { emailorMobile, password } = req.body;
  const userEntry = emailorMobile.toString();
  const user = await User.findOne({
    $or: [{ email: userEntry }, { number: userEntry }],
  });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// REGISTER A NEW USER
// @router '/api/users'
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, number, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    number,
    password,
  });

  if (user) {
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// GET USER PROFILE
// @router '/api/users/profile'
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// UPDATE USER PROFILE
// @router PUT '/api/users/profile'
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.number = req.body.number || user.number;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      number: updatedUser.number,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// GET ALL USERS
// @router get /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// DELETE USER
// @router DELETE /api/users/:id
// @access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// GET USER BY ID
// @router GET /api/users/:id
// @router private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// UPDATE USER BY ID
// @router UPDATE /api/users/:id
// @access private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.number = req.body.number || user.number;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      number: updatedUser.number,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// UPDATE USER BY ID
// @router UPDATE /api/users/:id
// @access public
const getOtp = asyncHandler(async (req, res) => {

  const { resetEmail } = req.body;

  const existingUser = await User.findOne({ email: resetEmail });
  if (existingUser) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: resetEmail,
      otp: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    if (otpResponse) {
      mail(resetEmail, otpcode)
      res.status(201).json({
        message: "Success",
      });
    }
  } else {
    res.status(400);
    throw new Error("User does not exist");
  }
});

const resetPassword = asyncHandler(async (req,res) => {
  const { resetEmail, otp, newPassword } = req.body;

  let data = await Otp.findOne({email: resetEmail, otp: otp})

  if (data) {
    const currentTime = new Date().getTime();
    const diff = data.expiresIn - currentTime;
    if(diff < 0){
      res.status(400);
      throw new Error("OTP expired. Please try again");
    } else {
      const user = await User.findOne({email: resetEmail});
      user.password = newPassword;
      const updatedUser = user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        number: updatedUser.number,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }
  }else{
    res.status(400);
    throw new Error("Some error occured. Please check the OTP entered");
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getOtp,
  resetPassword
};
