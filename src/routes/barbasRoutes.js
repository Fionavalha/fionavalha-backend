import { Router } from "express";
import { listarBarbas, listarBarba, adicionarBarba, editarBarba, excluirBarba } from "../controllers/barbaController.js";

const router = Router();

router.get("/:id_barba", listarBarba);
router.get("/", listarBarbas);
router.post("/", adicionarBarba);
router.put("/:id_barba", editarBarba);
router.delete("/:id_barba", excluirBarba);

export default router;
