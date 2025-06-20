import { Router } from "express";
import loginRouter from "./loginRoutes.js";
import cabeloRoutes from "./cabelosRoutes.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/cabelos", cabeloRoutes);

export default router;