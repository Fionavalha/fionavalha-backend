import { Router } from "express";
import {
  listarServicosRealizados,
  listarServicoRealizado,
  adicionarServicoRealizado,
  editarServicoRealizado,
  excluirServicoRealizado,
} from "../controllers/servicoRealizadoController.js";

const router = Router();

router.get("/:id_servico_realizado", listarServicoRealizado);
router.get("/", listarServicosRealizados);
router.post("/", adicionarServicoRealizado);
router.put("/:id_servico_realizado", editarServicoRealizado);
router.delete("/:id_servico_realizado", excluirServicoRealizado);

export default router;
