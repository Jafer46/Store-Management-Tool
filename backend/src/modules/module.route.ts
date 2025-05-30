import express from "express";
import taxRoute from "./accounting/routes/tax.route";
const router: express.Router = express.Router();

router.use("/accounting/taxes", taxRoute);

export default router;
