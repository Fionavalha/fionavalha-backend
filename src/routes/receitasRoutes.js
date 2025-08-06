import { Router } from "express";
import { listarReceitas } from "../controllers/receitasController.js";
const router = Router();

router.get("/", listarReceitas);

export default router;
