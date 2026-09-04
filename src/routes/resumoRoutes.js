import { Router } from "express";
import {
  listarAnosComDados,
  listarResumoAnual,
} from "../controllers/resumoController.js";

const router = Router();

router.get("/anos", listarAnosComDados);
router.get("/anual", listarResumoAnual);

export default router;
