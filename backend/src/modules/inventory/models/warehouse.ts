import { Schema, model } from "mongoose";
import { IWarehouse } from "../../../constants/types";

const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true },
    description: { type: String },
    address: {
      city: { type: String },
      zone: { type: String },
      wereda: { type: String },
      kebele: { type: String },
      house_no: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IWarehouse>("Warehouse", warehouseSchema);
