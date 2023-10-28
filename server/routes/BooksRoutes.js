import { Router } from "express";
import {
    addBook,
    getUserAuthBooks,
    getBookData,
    editBook,
    getBooks
} from "../controllers/BooksController.js";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer({ dest: "uploads/" });

export const booksRoutes = Router();

booksRoutes.post("/add", verifyToken, upload.array("thumbnailUrl"), addBook);
booksRoutes.get("/get-user-books", verifyToken, getUserAuthBooks);
booksRoutes.get("/get-book-data/:bookId", getBookData);
booksRoutes.put("/edit-book/:bookId", verifyToken, upload.array("images"), editBook);
booksRoutes.get("/get-all-books", verifyToken, getBooks);

export default booksRoutes;