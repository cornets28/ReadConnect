import { Router } from "express";
import {
    addBook
} from "../controllers/BooksController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

export const booksRoutes = Router();

booksRoutes.post("/add", verifyToken, upload.array("thumbnailUrl"), addBook);

export default booksRoutes;