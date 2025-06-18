import { Router } from "express";
import product from "../models/product";
import { Controller } from "../../../common/controllers/template.controller";
const { create, deleteMany, findMany, findOne, update, updateMany, deleteOne } =
  new Controller(product);

const router = Router();

router.post("/", create);
router.get("/", findMany);
router.get("/:id", findOne);
router.put("/", updateMany);
router.put("/:id", update);
router.delete("/", deleteMany);
router.delete("/:id", deleteOne);

export default router;
