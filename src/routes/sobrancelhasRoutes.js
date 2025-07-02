import { Router } from "express";
import { listarSobrancelhas, listarSobrancelha, adicionarSobrancelha, editarSobrancelha, excluirSobrancelha } from "../controllers/sobrancelhaController.js";

const router = Router();

router.get("/:id_sobrancelha", listarSobrancelha);
router.get("/", listarSobrancelhas);
router.post("/", adicionarSobrancelha);
router.put("/:id_sobrancelha", editarSobrancelha);
router.delete("/:id_sobrancelha", excluirSobrancelha);

export default router;
