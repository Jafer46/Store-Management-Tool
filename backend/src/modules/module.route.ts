import express from "express";
import taxRoute from "./accounting/routes/tax.route";
import accountGroupRoute from "./accounting/routes/account-group.route";
import approvalStageRoute from "./admin/document/routes/approval-stage.route";
const router: express.Router = express.Router();

router.use("/accounting/taxes", taxRoute);
router.use("/accounting/account-groups", accountGroupRoute);
router.use("/document/approval", approvalStageRoute);

export default router;
