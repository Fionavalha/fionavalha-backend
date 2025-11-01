import { Router } from "express";
import {
  listarNumeroClientes,
  editarNumeroClientes,
  listarStatusBarbearia,
  editarStatusBarbearia,
  listarBarbearias,
  listarHorarioBarbearia,
  editarHorarioBarbearia,
  listarAdicionalFormaPagamento,
  editarAdicionalFormaPagamento,
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
router.get("/adicional-forma-pagamento", bearerToken, listarAdicionalFormaPagamento);
router.put("/adicional-forma-pagamento", bearerToken, editarAdicionalFormaPagamento);

export default router;
