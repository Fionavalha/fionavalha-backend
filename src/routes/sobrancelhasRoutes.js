import { Router } from "express";
import { listarSobrancelhas, listarSobrancelha, adicionarSobrancelha, editarSobrancelha, excluirSobrancelha } from "../controllers/sobrancelhaController.js";
import { bearerToken } from "../middlewares/auth.js";

const router = Router();

router.get("/:id_sobrancelha", listarSobrancelha);
router.get("/", listarSobrancelhas);
router.post("/", bearerToken, adicionarSobrancelha);
router.put("/:id_sobrancelha", bearerToken, editarSobrancelha);
router.delete("/:id_sobrancelha", bearerToken, excluirSobrancelha);

export default router;
