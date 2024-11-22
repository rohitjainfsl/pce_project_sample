import { Router } from "express";
import {
  addBook,
  deleteBook,
  listAllBooks,
  listSingleBook,
  updateBook,
} from "../controllers/Books.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/books", listAllBooks);

router.get("/books/:id", listSingleBook);

router.delete("/books/:id", deleteBook);

router.put("/books/:id", updateBook);

router.post("/books/add", upload.single("image"), addBook);

export default router;
