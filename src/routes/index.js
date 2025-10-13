import { Router } from "express";
import { bearerToken } from "../middlewares/auth.js";
import loginRouter from "./loginRoutes.js";
import alterarSenhaRouter from "./alterarSenhaRoutes.js";
import cabeloRoutes from "./cabelosRoutes.js";
import barbaRoutes from "./barbasRoutes.js";
import sobrancelhaRoutes from "./sobrancelhasRoutes.js";
import adicionaisRoutes from "./adicionaisRoutes.js";
import formasPagamentoRoutes from "./formasPagamentoRoutes.js";
import servicosRealizadosRoutes from "./servicosRealizadosRoutes.js";
import receitasRoutes from "./receitasRoutes.js";
import despesasRoutes from "./despesasRoutes.js";
import barbeariasRoutes from "./barbeariasRoutes.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/alterar-senha", bearerToken, alterarSenhaRouter);
router.use("/cabelos", bearerToken, cabeloRoutes);
router.use("/barbas", bearerToken, barbaRoutes);
router.use("/sobrancelhas", bearerToken, sobrancelhaRoutes);
router.use("/adicionais", bearerToken, adicionaisRoutes);
router.use("/formas-pagamento", bearerToken, formasPagamentoRoutes);
router.use("/servicos-realizados", bearerToken, servicosRealizadosRoutes);
router.use("/receitas", bearerToken, receitasRoutes);
router.use("/despesas", bearerToken, despesasRoutes);
router.use("/barbearias", bearerToken, barbeariasRoutes);

export default router;
