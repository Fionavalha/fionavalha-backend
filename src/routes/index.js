import { Router } from "express";
import cabeloRoutes from "./cabelosRoutes.js";

const router = Router();

router.use("/cabelos", cabeloRoutes);

export default router;