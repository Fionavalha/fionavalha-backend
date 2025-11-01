import { Router } from "express";
import { listarCabelos, listarCabelo, adicionarCabelo, editarCabelo, excluirCabelo } from "../controllers/cabeloController.js";
import { bearerToken } from "../middlewares/auth.js";

const router = Router();

router.get("/:id_cabelo", listarCabelo);
router.get("/", listarCabelos);
router.post("/", bearerToken, adicionarCabelo);
router.put("/:id_cabelo", bearerToken, editarCabelo);
router.delete("/:id_cabelo", bearerToken, excluirCabelo);

export default router;
