import express from "express";
import { UserController } from "../controllers/index.ts";

const router = express.Router();

router.get("/generate-token/:id", UserController.generateToken);

export default router;
