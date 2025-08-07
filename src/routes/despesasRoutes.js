import { Router } from "express";
import { listarDespesa, listarDespesas, adicionarDespesa, editarDespesa, excluirDespesa } from "../controllers/despesasController.js";

const router = Router();

router.get("/:id_despesa", listarDespesa);
router.get("/", listarDespesas);
router.post("/", adicionarDespesa);
router.put("/:id_despesa", editarDespesa);
router.delete("/:id_despesa", excluirDespesa);

export default router;
