import { Router } from "express";
import {
  createTax,
  deleteManyTaxes,
  deleteTax,
  getTax,
  getTaxes,
  updateTax,
} from "../controllers/tax.controller";

const router = Router();

router.post("/", createTax);
router.get("/", getTaxes);
router.get("/:id", getTax);
router.put("/:id", updateTax);
router.delete("/", deleteManyTaxes);
router.delete("/:id", deleteTax);

export default router;
