import express from "express";
import providers from "../controllers/providers.js";

const router=express.Router();

router.post("/registerProvider",providers.registerProvider);
router.get("/listProviders",providers.listProviders);
router.put("/updateProviders",providers.updateProviders);
router.delete("/deleteProviders/:_id",providers.deleteProvider);

export default router;