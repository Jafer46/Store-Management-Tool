import { Schema, Types, model } from "mongoose";
import { IUnitOfMeasure } from "../../../constants/types";

const unitSchema = new Schema<IUnitOfMeasure>(
  {
    name: { type: String, required: true },
    conversion: [
      { unit: { type: Types.ObjectId, ref: "UnitOfMeasure" }, ratio: Number },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IUnitOfMeasure>("UnitOfMeasure", unitSchema);
