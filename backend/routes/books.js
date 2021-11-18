import express from "express";
import book from "../controllers/books.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router=express.Router();

router.post("/registerBook",auth,admin,book.registerBook);
router.get("/listBook",auth,admin,book.listBook);
router.put("/updateBook",auth,admin,book.updateBook);
router.delete("/deleteBook/:_id",auth,admin,book.deleteBook);
router.get("/findBook/:_id",auth,admin,book.findBook)

export default router;