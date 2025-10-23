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
import { bearerToken } from "../middlewares/auth.js";

const router = Router();

router.get("/", listarBarbearias);
router.get("/numero-clientes", listarNumeroClientes);
router.put("/numero-clientes", bearerToken, editarNumeroClientes);
router.get("/status", listarStatusBarbearia);
router.put("/status", bearerToken, editarStatusBarbearia);
router.get("/horario", listarHorarioBarbearia);
router.put("/horario", bearerToken, editarHorarioBarbearia);

export default router;
