import express from "express";
const router: express.Router = express.Router();

router.use("/accounting/taxes", require("./accounting/routes/tax.route"));

export default router;
