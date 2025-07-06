import { Router } from "express";
import { basicAuth } from "../middlewares/auth.js";
import loginRouter from "./loginRoutes.js";
import cabeloRoutes from "./cabelosRoutes.js";
import barbaRoutes from "./barbasRoutes.js";
import sobrancelhaRoutes from "./sobrancelhasRoutes.js";
import adicionaisRoutes from "./adicionaisRoutes.js";
import formasPagamentoRoutes from "./formasPagamentoRoutes.js";
import servicosRealizadosRoutes from "./servicosRealizadosRoutes.js";

const router = Router();

router.use("/login", basicAuth, loginRouter);
router.use("/cabelos", cabeloRoutes);
router.use("/barbas", barbaRoutes);
router.use("/sobrancelhas", sobrancelhaRoutes);
router.use("/adicionais", adicionaisRoutes);
router.use("/formas-pagamento", formasPagamentoRoutes);
router.use("/servicos-realizados", servicosRealizadosRoutes);

export default router;