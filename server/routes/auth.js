// auth.js

import express from "express";
import { register, login } from "../controllers/auth.js";
import { updateUser } from "../controllers/userController.js"; // Import updateUser from userController.js

const router = express.Router();

/* REGISTER USER */
router.post("/register", register);

/* LOGIN USER */
router.post("/login", login);

/* UPDATE USER */
router.put("/updateUser/:id", updateUser); // Route for updating user information

export default router;
