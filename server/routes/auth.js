import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

/* REGISTER USER */
router.post("/register", register);

/* LOGIN USER */
router.post("/login", login);

export default router;
