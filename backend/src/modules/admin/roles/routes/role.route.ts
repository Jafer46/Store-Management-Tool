import { Router } from "express";
import {
  createRole,
  deleteManyRoles,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controller/roles.controller";

const router = Router();

router.get("/", getRoles);
router.get("/:id", getRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/", deleteManyRoles);
router.delete("/:id", deleteRole);

export default router;
