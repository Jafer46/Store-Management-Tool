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

export default model<ITax>("Tax", taxSchema);
