import { Router } from "express";
import {
    addBook,
    getUserAuthBooks
} from "../controllers/BooksController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

export const booksRoutes = Router();

booksRoutes.post("/add", verifyToken, upload.array("thumbnailUrl"), addBook);
booksRoutes.get("/get-user-books", verifyToken, getUserAuthBooks);

export default booksRoutes;