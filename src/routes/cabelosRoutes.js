import { Router } from "express";
import { listarCabelos, listarCabelo, adicionarCabelo, editarCabelo, excluirCabelo } from "../controllers/CabeloController.js";

const router = Router();

router.get("/:id_cabelo", listarCabelo);
router.get("/", listarCabelos);
router.post("/", adicionarCabelo);
router.put("/:id_cabelo", editarCabelo);
router.delete("/:id_cabelo", excluirCabelo);

export default router;
