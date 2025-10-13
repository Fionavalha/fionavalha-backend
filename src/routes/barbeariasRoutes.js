import { Router } from "express";
import { listarNumeroClientes, editarNumeroClientes } from "../controllers/barbeariasController.js";

const router = Router();

router.get("/numero-clientes/:id_barbeiro", listarNumeroClientes);
router.put("/numero-clientes/:id_barbeiro", editarNumeroClientes);

export default router;
