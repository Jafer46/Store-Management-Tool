import { Router } from "express";
const router = Router();

router.use("/accounting/taxes", require("./accounting/routes/tax.route"));

export default router;
