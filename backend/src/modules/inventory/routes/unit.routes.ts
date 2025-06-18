import { Router } from "express";

import { Controller } from "../../../common/controllers/template.controller";
import unit from "../models/unitofmeasure";

const { create, deleteMany, findMany, findOne, update, updateMany, deleteOne } =
  new Controller(unit);

const router = Router();

router.post("/", create);
router.get("/", findMany);
router.get("/:id", findOne);
router.put("/", updateMany);
router.put("/:id", update);
router.delete("/", deleteMany);
router.delete("/:id", deleteOne);

export default router;
