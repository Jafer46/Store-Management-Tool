import { Router } from "express";

import {
  createContact,
  deleteContact,
  deleteManyContacts,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contact.controller";
const router = Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.put("/:id", updateContact);
router.delete("/", deleteManyContacts);
router.delete("/:id", deleteContact);

export default router;
