import { Router } from "express";
import { realizarLogin } from "../controllers/loginController.js";

const router = Router();

router.post("/", realizarLogin);

export default router;
