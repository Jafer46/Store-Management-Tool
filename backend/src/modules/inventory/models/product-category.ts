import { model, Schema } from "mongoose";
import { IProductCategory } from "../../../constants/types";

const productCategorySchema = new Schema<IProductCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    account: {
      expenseAccount: { type: Schema.Types.ObjectId, ref: "Account" },
      incomeAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    },
    status: {
      document_status: { type: String, required: true },
      approval_stage: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model("ProductCategory", productCategorySchema);
