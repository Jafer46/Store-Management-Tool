import { Schema, model } from "mongoose";
import { IApproval_Stage } from "../../../../constants/types";

const approvalStageSchema = new Schema<IApproval_Stage>(
  {
    name: String,
    stages: [
      { level: Number, stage_name: String, stage_no: Number, isLast: Boolean },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default model<IApproval_Stage>("ApprovalStage", approvalStageSchema);
