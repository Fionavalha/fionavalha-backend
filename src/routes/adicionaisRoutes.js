import { Router } from "express";
import { listarAdicionais, listarAdicional, adicionarAdicional, editarAdicional, excluirAdicional } from "../controllers/adicionalController.js";

const router = Router();

router.get("/:id_adicional", listarAdicional);
router.get("/", listarAdicionais);
router.post("/", adicionarAdicional);
router.put("/:id_adicional", editarAdicional);
router.delete("/:id_adicional", excluirAdicional);

export default router;
