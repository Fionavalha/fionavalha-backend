import { Router } from "express";
import { listarAdicionais, listarAdicional, adicionarAdicional, editarAdicional, excluirAdicional } from "../controllers/adicionalController.js";
import { bearerToken } from "../middlewares/auth.js";

const router = Router();

router.get("/:id_adicional", listarAdicional);
router.get("/", listarAdicionais);
router.post("/", bearerToken, adicionarAdicional);
router.put("/:id_adicional", bearerToken, editarAdicional);
router.delete("/:id_adicional", bearerToken, excluirAdicional);

export default router;
