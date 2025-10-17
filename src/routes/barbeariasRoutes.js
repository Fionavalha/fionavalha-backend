import { Router } from "express";
import { listarNumeroClientes, editarNumeroClientes, listarStatusBarbearia, editarStatusBarbearia } from "../controllers/barbeariasController.js";

const router = Router();

router.get("/numero-clientes", listarNumeroClientes);
router.put("/numero-clientes", editarNumeroClientes);
router.get("/status", listarStatusBarbearia);
router.put("/status", editarStatusBarbearia);

export default router;
