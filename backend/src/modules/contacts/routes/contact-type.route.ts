import { Router } from "express";
import {
  createContactType,
  deleteManyContactTypes,
  getContactType,
  getContactTypes,
  updateContactType,
  deleteContactType,
} from "../controllers/contact-type.controller";

const router = Router();

router.post("/", createContactType);
router.get("/", getContactTypes);
router.get("/:id", getContactType);
router.put("/:id", updateContactType);
router.delete("/", deleteManyContactTypes);
router.delete("/:id", deleteContactType);

export default router;
