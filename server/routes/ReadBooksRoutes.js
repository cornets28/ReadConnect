import { Router } from "express";
import {
    getUserAuthReadBooks
} from "../controllers/ReadBooksControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


export const readBooksRoutes = Router();

readBooksRoutes.post("/get-user-read-books", verifyToken, getUserAuthReadBooks);

export default readBooksRoutes;