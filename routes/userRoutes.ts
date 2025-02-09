import express from "express";
import { UserController } from "../controllers/index.ts";

const router = express.Router();

router.get("/generate-token/:id", UserController.generateToken);
router.get("/fetch-user-data", UserController.fetchUserData);

export default router;
