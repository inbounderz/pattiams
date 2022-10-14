import express from "express";

const router = express.Router();

//Imports from the controller
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, updateUser, getUserById, getOtp, resetPassword } from "../controllers/userController.js";
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/getotp', getOtp);
router.put('/reset', resetPassword);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;