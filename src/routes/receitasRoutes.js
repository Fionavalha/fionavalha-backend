import { Router } from "express";
import { listarReceitas, listarReceitasFormaPagamento } from "../controllers/receitasController.js";
const router = Router();

router.get("/", listarReceitas);
router.get("/formas-pagamento", listarReceitasFormaPagamento)

export default router;
