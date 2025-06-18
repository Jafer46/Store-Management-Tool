import { Schema, model } from "mongoose";
import { IProduct } from "../../../constants/types";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    reference: { type: String },
    description: { type: String },
    price: { type: Number },
    cost: { type: Number },
    shelf_life: { type: Number },
    product_type: { type: String, required: true },
    image: { type: String },
    salable: { type: Boolean, required: true },
    purchaseable: { type: Boolean, required: true },
    unit: { type: Schema.Types.ObjectId, ref: "UnitOfMeasure", required: true },
    default_warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse" },
    default_tax: { type: Schema.Types.ObjectId, ref: "Tax", required: true },
    status: {
      document_status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        default: "Active",
      },
      approval_stage: { type: String, required: true, default: "Draft" },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IProduct>("Product", productSchema);
