import { Router } from "express";
import { listarFormasPagamento } from "../controllers/formasPagamentoController.js";

const router = Router();

router.get("/", listarFormasPagamento);

export default router;
