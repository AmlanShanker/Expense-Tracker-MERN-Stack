import express from "express";
import { register, login } from "../controllers/auth.js";
import { updateUser, forgotPassword } from "../controllers/userController.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

/* REGISTER USER */
router.post("/register", register);

/* LOGIN USER */
router.post("/login", login);

/* UPDATE USER */
router.post("/users/:id", updateUser);

/* FORGOT PASSWORD */
router.post("/forgotPassword", forgotPassword);

/* ADD EXPENSE */
router.post("/add", addExpense);

/* GET EXPENSES */
router.get("/get", getExpenses);

export default router;
