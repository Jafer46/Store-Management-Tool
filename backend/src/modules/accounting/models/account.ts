import {
  Account_Type,
  Document_status,
  IAccount,
} from "../../../constants/types";
import { Schema, model } from "mongoose";

const accountSchema = new Schema<IAccount>(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    type: { type: String, enum: Account_Type, required: true },
    group: { type: Schema.Types.ObjectId, ref: "AccountGroup", required: true },
    default_tax: { type: Schema.Types.ObjectId, ref: "Tax", required: true },
    status: {
      document_status: {
        type: String,
        enum: Document_status,
        default: "Active",
        required: true,
      },
      approval_stage: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IAccount>("Account", accountSchema);
