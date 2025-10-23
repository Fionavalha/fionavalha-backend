import { Router } from "express";
import { listarBarbas, listarBarba, adicionarBarba, editarBarba, excluirBarba } from "../controllers/barbaController.js";
import { bearerToken } from "../middlewares/auth.js";

const router = Router();

router.get("/:id_barba", listarBarba);
router.get("/", listarBarbas);
router.post("/", bearerToken, adicionarBarba);
router.put("/:id_barba", bearerToken, editarBarba);
router.delete("/:id_barba", bearerToken, excluirBarba);

export default router;
