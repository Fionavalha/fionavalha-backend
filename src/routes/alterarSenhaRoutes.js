import { Router } from "express";
import { alterarSenha } from "../controllers/alterarSenhaController.js";

const router = Router();

router.post("/", alterarSenha);

export default router;
