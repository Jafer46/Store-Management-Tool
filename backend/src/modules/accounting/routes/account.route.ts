import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from "../controllers/account.controller";
const router = Router();

router.post("/", createAccount);
router.get("/", getAccounts);
router.get("/:id", getAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
