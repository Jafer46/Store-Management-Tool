import { Router } from "express";
import {
  createApproveStage,
  getApprovalStages,
} from "../controllers/approval-stage.controller";

const router = Router();

router.get("/", getApprovalStages);
router.post("/", createApproveStage);

export default router;
