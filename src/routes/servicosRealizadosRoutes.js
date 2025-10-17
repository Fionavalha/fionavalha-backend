import { Router } from "express";
import { listarServicosRealizados, adicionarServicoRealizado, editarServicoRealizado, excluirServicoRealizado, listarItensServico } from "../controllers/servicoRealizadoController.js";

const router = Router();

router.get("/", listarServicosRealizados);
router.get("/itens/:id_servico_realizado", listarItensServico);
router.post("/", adicionarServicoRealizado);
router.put("/:id_servico_realizado", editarServicoRealizado);
router.delete("/:id_servico_realizado", excluirServicoRealizado);

export default router;
