import express from "express";
import { register, login } from "../controllers/auth.js";
import { updateUser, forgotPassword } from "../controllers/userController.js"; // Import forgotPassword from userController.js
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

/* REGISTER USER */
router.post("/register", register);

/* LOGIN USER */
router.post("/login", login);

/* UPDATE USER */
router.post("/users/:id", updateUser); // Route for updating user information

/* FORGOT PASSWORD */
router.post("/forgotPassword", forgotPassword); // Ensure the route matches the frontend URL

/* ADD EXPENSE */
router.post("/add", addExpense);

/* GET EXPENSES */
router.get("/", getExpenses);

export default router;
