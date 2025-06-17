import { Schema, model } from "mongoose";
import { IContact } from "../../../constants/types";

const contactSchema = new Schema<IContact>(
  {
    full_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    tax_id: { type: String },
    individual: { type: Boolean, required: true },
    contact_type: {
      type: Schema.Types.ObjectId,
      ref: "ContactType",
      required: true,
    },
    address: {
      city: { type: String },
      zone: { type: String },
      wereda: { type: String },
      kebele: { type: String },
      house_no: { type: String },
    },
    accounts: {
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

export default model("Contact", contactSchema);
