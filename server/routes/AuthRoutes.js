import { Router } from "express";
import { signup, login, getUserInfo } from "../controller/AuthControllers.js";
import { verifyToken } from '../middlewares/AuthMiddleware.js'

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/user-info", verifyToken, getUserInfo);

export default authRoutes;