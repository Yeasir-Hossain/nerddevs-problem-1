import { Router } from "express";
import supportRoutes from "../services/support/route";

const router: Router = Router();

const api = [supportRoutes];

router.use("/api", api);

export default router;
