import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

export default router;
