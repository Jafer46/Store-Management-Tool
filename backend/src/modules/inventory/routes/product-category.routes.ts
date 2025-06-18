import { Controller } from "../../../common/controllers/template.controller";
import productCategory from "../models/product-category";

const { create, deleteMany, findMany, findOne, update, updateMany, deleteOne } =
  new Controller(productCategory);

import { Router } from "express";

const router = Router();

router.post("/", create);
router.get("/", findMany);
router.get("/:id", findOne);
router.put("/", updateMany);
router.put("/:id", update);
router.delete("/", deleteMany);
router.delete("/:id", deleteOne);

export default router;
