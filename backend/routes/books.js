import express from "express";
import book from "../controllers/books.js";

const router=express.Router();

router.post("/registerBook",book.registerBook);
router.get("/listBook",book.listBook);
router.put("/updateBook",book.updateBook);
router.delete("/deleteBook/:_id",book.deleteBook);
router.get("/findBook/:_id",book.findBook)

export default router;