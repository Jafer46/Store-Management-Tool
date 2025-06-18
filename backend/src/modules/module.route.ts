import express from "express";
import taxRoute from "./accounting/routes/tax.route";
import accountGroupRoute from "./accounting/routes/account-group.route";
import approvalStageRoute from "./admin/document/routes/approval-stage.route";
import roleRoute from "./admin/roles/routes/role.route";
import accountRoute from "./accounting/routes/account.route";
import contactRoute from "./contacts/routes/contact.route";
import contactTypeRoute from "./contacts/routes/contact-type.route";
import productCategoryRoute from "./inventory/routes/product-category.routes";
const router: express.Router = express.Router();

router.use("/accounting/taxes", taxRoute);
router.use("/accounting/account-groups", accountGroupRoute);
router.use("/document/approval", approvalStageRoute);
router.use("/role", roleRoute);
router.use("/account", accountRoute);
router.use("/contact", contactRoute);
router.use("/contact-type", contactTypeRoute);
router.use("/product-category", productCategoryRoute);

export default router;
