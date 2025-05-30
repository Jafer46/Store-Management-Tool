import { CrudService } from "../../../../common/service/crud.service";
import { IApproval_Stage } from "../../../../constants/types";
import approvalStage from "../models/approval-stage";

export const approvalStageService = new CrudService<IApproval_Stage>(
  approvalStage
);
