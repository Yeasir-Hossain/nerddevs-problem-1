import { Router } from "express";
import { register } from "./entity";
import makeAsync from "../../utils/makeAsync";

const router = Router();

router.post("/support/create_ticket", makeAsync(register));

export default router;
