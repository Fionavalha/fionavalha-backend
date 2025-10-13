import { Router } from "express";
import { listarNumeroClientes, editarNumeroClientes, listarStatusBarbearia, editarStatusBarbearia } from "../controllers/barbeariasController.js";

const router = Router();

router.get("/numero-clientes/:id_barbeiro", listarNumeroClientes);
router.put("/numero-clientes/:id_barbeiro", editarNumeroClientes);
router.get("/status/:id_barbeiro", listarStatusBarbearia);
router.put("/status/:id_barbeiro", editarStatusBarbearia);

export default router;
