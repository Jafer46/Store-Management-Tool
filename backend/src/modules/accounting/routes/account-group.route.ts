import { Router } from "express";

import {
  createAccountGroup,
  deleteAccountGroup,
  getAccountGroup,
  getAccountGroups,
  updateAccountGroup,
} from "../controllers/account-group.controller";

const router = Router();

router.post("/", createAccountGroup);
router.get("/", getAccountGroups);
router.get("/:id", getAccountGroup);
router.put("/:id", updateAccountGroup);
router.delete("/:id", deleteAccountGroup);

export default router;
