import { Router } from "express";
import {
  listarNumeroClientes,
  editarNumeroClientes,
  listarStatusBarbearia,
  editarStatusBarbearia,
  listarBarbearias,
  listarHorarioBarbearia,
  editarHorarioBarbearia,
} from "../controllers/barbeariasController.js";

const router = Router();

router.get("/", listarBarbearias);
router.get("/numero-clientes", listarNumeroClientes);
router.put("/numero-clientes", editarNumeroClientes);
router.get("/status", listarStatusBarbearia);
router.put("/status", editarStatusBarbearia);
router.get("/horario", listarHorarioBarbearia);
router.put("/horario", editarHorarioBarbearia);

export default router;
