import { Router } from "express";
import { bearerToken } from "../middlewares/auth.js";
import loginRouter from "./loginRoutes.js";
import cabeloRoutes from "./cabelosRoutes.js";
import barbaRoutes from "./barbasRoutes.js";
import sobrancelhaRoutes from "./sobrancelhasRoutes.js";
import adicionaisRoutes from "./adicionaisRoutes.js";
import formasPagamentoRoutes from "./formasPagamentoRoutes.js";
import servicosRealizadosRoutes from "./servicosRealizadosRoutes.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/cabelos", bearerToken, cabeloRoutes);
router.use("/barbas", bearerToken, barbaRoutes);
router.use("/sobrancelhas", bearerToken, sobrancelhaRoutes);
router.use("/adicionais", bearerToken, adicionaisRoutes);
router.use("/formas-pagamento", bearerToken, formasPagamentoRoutes);
router.use("/servicos-realizados", bearerToken, servicosRealizadosRoutes);

export default router;