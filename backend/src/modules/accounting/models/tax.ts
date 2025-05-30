import { ITax } from "../../../constants/types";
import { Schema, model } from "mongoose";

const taxSchema = new Schema<ITax>(
  {
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Tax = model<ITax>("Tax", taxSchema);
