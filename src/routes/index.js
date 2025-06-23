import { Router } from "express";
import loginRouter from "./loginRoutes.js";
import cabeloRoutes from "./cabelosRoutes.js";
import { basicAuth } from "../middlewares/auth.js";

const router = Router();

router.use("/login", basicAuth, loginRouter);
router.use("/cabelos", cabeloRoutes);

export default router;